import type {
    ExportConfig,
    JsPDF,
    JsPDFOptions,
    PDFDimensions,
    JsPDFInstance,
    ImageLayout,
    Size,
    SizeUnit,
    PageFormat,
} from './type';
import { FillMode } from './type';

export class PDFGenerator {
    private jsPDF: JsPDF | null = null;

    //  PDF格式预设尺寸（点单位）
    private static readonly FORMAT_DIMENSIONS: Record<Exclude<PageFormat, 'custom'>, Size> = {
        a4: { width: 595.28, height: 841.89 },
        a3: { width: 841.89, height: 1190.55 },
        letter: { width: 612, height: 792 },
        legal: { width: 612, height: 1008 },
    } as const;

    // 单位转换系数（转为点单位）
    private static readonly UNIT_CONVERSION: Record<SizeUnit, number> = {
        px: 0.75, // 96 DPI to 72 DPI
        mm: 2.834645669, // 1mm = 2.834645669pt
        pt: 1, // 点单位不转换
    } as const;

    private async loadJsPDF() {
        if (!this.jsPDF) {
            const module = await import('jspdf');
            this.jsPDF = module.default;
        }
        return this.jsPDF;
    }

    async createPDF(config: ExportConfig = {}) {
        const JsPDF = await this.loadJsPDF();

        const pdfOptions = this.buildJsPDFOptions(config);

        return new JsPDF(pdfOptions);
    }

    /**
     *  构建jsPDF配置选项
     */
    private buildJsPDFOptions(config: ExportConfig): JsPDFOptions {
        const baseOptions: JsPDFOptions = {
            orientation: config.orientation || 'portrait',
            unit: 'pt',
            format: this.getPDFFormat(config),
            compress: true,
            precision: 16,
        };

        // 合并用户自定义jsPDF配置
        return { ...baseOptions, ...config.jsPDFOptions };
    }

    private getPDFFormat(config: ExportConfig): string | [number, number] {
        if (config.format === 'custom' && config.customSize) {
            const dimensions = this.convertToPDFDimensions(config.customSize);
            return [dimensions.width, dimensions.height];
        }
        return config.format || 'a4';
    }

    private convertToPDFDimensions(
        customSize: NonNullable<ExportConfig['customSize']>,
    ): PDFDimensions {
        const { width, height, unit = 'pt' } = customSize;
        const conversionFactor = PDFGenerator.UNIT_CONVERSION[unit];
        return {
            width: width * conversionFactor,
            height: height * conversionFactor,
            unit: 'pt',
        };
    }

    addImageToPDF(
        pdf: JsPDFInstance,
        imageData: string,
        canvas: HTMLCanvasElement,
        config: ExportConfig,
    ): ImageLayout {
        // 步骤1:获取PDF的尺寸
        const pageDimensions = this.getPDFPageDimensions(config);
        // 步骤2：获取Canvas尺寸
        const canvasDimensions: Size = {
            width: canvas.width,
            height: canvas.height,
        };

        // 步骤3：计算图片布局
        const layout = this.calculateImageLayout(
            pageDimensions,
            canvasDimensions,
            config.fillMode || FillMode.FIT,
        );

        // 步骤4：应用边距（如果有）
        const finalLayout = this.applyMargins(layout, config.margins);

        // 步骤5：添加图片到PDF
        pdf.addImage(
            imageData,
            'PNG',
            finalLayout.x,
            finalLayout.y,
            finalLayout.finalWidth,
            finalLayout.finalHeight,
        );

        // 调试信息
        this.logLayoutInfo(finalLayout);

        return finalLayout;
    }

    /**
     * 获取PDF页面尺寸
     */
    private getPDFPageDimensions(config: ExportConfig): Size {
        if (config.format === 'custom' && config.customSize) {
            const dimensions = this.convertToPDFDimensions(config.customSize);
            return { width: dimensions.width, height: dimensions.height };
        }

        const format = config.format || 'a4';
        const baseDimensions =
            PDFGenerator.FORMAT_DIMENSIONS[format as Exclude<PageFormat, 'custom'>];

        // 处理横向/纵向
        if (config.orientation === 'landscape') {
            return {
                width: baseDimensions.height,
                height: baseDimensions.width,
            };
        }

        return baseDimensions;
    }

    /**
     * 计算图片布局
     */
    private calculateImageLayout(
        pageDimensions: Size,
        canvasDimensions: Size,
        fillMode: FillMode,
    ): ImageLayout {
        const { width: pageWidth, height: pageHeight } = pageDimensions;
        const { width: canvasWidth, height: canvasHeight } = canvasDimensions;

        // 计算缩放比例
        const scaleX = pageWidth / canvasWidth;
        const scaleY = pageHeight / canvasHeight;

        let finalWidth: number; // 最终图片宽度
        let finalHeight: number; // 最终图片高度
        let x: number; // 图片在页面中的x坐标
        let y: number; // 图片在页面中的y坐标
        let scaleRatio: number;

        switch (fillMode) {
            case FillMode.STRETCH:
                // 拉伸模式：完全铺满，可能变形
                finalWidth = pageWidth;
                finalHeight = pageHeight;
                x = 0;
                y = 0;
                scaleRatio = Math.max(scaleX, scaleY);
                break;
            case FillMode.COVER:
                // 覆盖模式：保持比例，铺满页面，可能裁剪
                scaleRatio = Math.max(scaleX, scaleY);
                finalWidth = canvasWidth * scaleRatio;
                finalHeight = canvasHeight * scaleRatio;
                x = (pageWidth - finalWidth) / 2;
                y = (pageHeight - finalHeight) / 2;
                break;

            case FillMode.FIT:
            default:
                // 适应模式：保持比例，完全显示，可能有空白
                scaleRatio = Math.min(scaleX, scaleY);
                finalWidth = canvasWidth * scaleRatio;
                finalHeight = canvasHeight * scaleRatio;
                x = (pageWidth - finalWidth) / 2;
                y = (pageHeight - finalHeight) / 2;
                break;
        }

        return {
            pageWidth,
            pageHeight,
            canvasWidth,
            canvasHeight,
            finalWidth,
            finalHeight,
            x,
            y,
            width: finalWidth,
            height: finalHeight,
            fillMode,
            scaleRatio,
        };
    }

    /**
     * 应用边距
     */
    private applyMargins(layout: ImageLayout, margins?: ExportConfig['margins']): ImageLayout {
        if (!margins) return layout;

        const { top = 0, right = 0, bottom = 0, left = 0 } = margins;

        return {
            ...layout,
            x: layout.x + left,
            y: layout.y + top,
            finalWidth: layout.finalWidth - left - right,
            finalHeight: layout.finalHeight - top - bottom,
            width: layout.finalWidth - left - right,
            height: layout.finalHeight - top - bottom,
        };
    }

    /**
     * 输出布局调试信息
     */
    private logLayoutInfo(layout: ImageLayout): void {
        console.group('📄 PDF layout information');
        console.table({
            'Page size': `${layout.pageWidth.toFixed(2)} × ${layout.pageHeight.toFixed(2)} pt`,
            'Canvas size': `${layout.canvasWidth} × ${layout.canvasHeight} px`,
            'Final image size': `${layout.finalWidth.toFixed(2)} × ${layout.finalHeight.toFixed(2)} pt`,
            'Position offset': `(${layout.x.toFixed(2)}, ${layout.y.toFixed(2)})`,
            'Scale ratio': layout.scaleRatio.toFixed(3),
            'Fill mode': layout.fillMode,
        });
        console.groupEnd();
    }

    savePDF(pdf: JsPDFInstance, filename: string) {
        if (!filename.endsWith('.pdf')) {
            filename += '.pdf';
        }
        pdf.save(filename);
    }
}
