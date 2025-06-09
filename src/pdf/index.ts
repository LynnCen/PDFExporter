import type { ExportConfig, ProgressCallback, ExportResult, ImageLayout } from './type';
import { FillMode } from './type';
import { CanvasGenerator } from './canvas-generator';
import { PDFGenerator } from './pdf-generator';

export class VueToPDFExporter {
    private readonly canvasGenerator = new CanvasGenerator();
    private readonly pdfGenerator = new PDFGenerator();

    /**
     *  导出元素为PDF
     */
    async export(
        element: HTMLElement,
        config: ExportConfig = {},
        onProgress?: ProgressCallback,
    ): Promise<ExportResult> {
        const startTime = Date.now();

        try {
            this.validateInput(element);

            const finalConfig = this.normalizeConfig(config);

            //  步骤1：生成Canvas
            onProgress?.({ percentage: 20, message: 'Capturing page content...' });
            const canvas = await this.generateCanvas(element, finalConfig);

            //  步骤2：转换图像数据
            onProgress?.({ percentage: 50, message: 'Processing image data...' });
            const imageData = this.generateImageData(canvas, finalConfig);

            //  步骤3：创建PDF并添加内容
            onProgress?.({ percentage: 70, message: 'Generating PDF document...' });
            const pdf = await this.pdfGenerator.createPDF(finalConfig);

            onProgress?.({ percentage: 85, message: 'Adding content to PDF...' });
            const layout = this.pdfGenerator.addImageToPDF(pdf, imageData, canvas, finalConfig);

            //  步骤4：保存文件
            onProgress?.({ percentage: 95, message: 'Downloading file...' });
            this.pdfGenerator.savePDF(pdf, finalConfig.filename!);

            onProgress?.({ percentage: 100, message: 'Export completed!' });

            return this.buildSuccessResult(imageData, startTime, layout);
        } catch (error) {
            return this.buildErrorResult(error);
        }
    }

    /**
     *  输入验证
     */
    private validateInput(element: HTMLElement): void {
        if (!element) {
            throw new Error('目标元素不存在');
        }
        if (!(element instanceof HTMLElement)) {
            throw new Error('目标必须是有效的HTML元素');
        }
    }

    /**
     *  配置标准化
     */
    private normalizeConfig(
        config: ExportConfig,
    ): Required<Pick<ExportConfig, 'filename' | 'quality' | 'orientation' | 'format'>> &
        ExportConfig {
        return {
            filename: `export-${Date.now()}.pdf`,
            quality: 1,
            orientation: 'portrait',
            format: 'a4',
            fillMode: FillMode.FIT,
            ...config,
        };
    }

    /**
     *  生成Canvas（使用用户配置）
     */
    private async generateCanvas(
        element: HTMLElement,
        config: ExportConfig,
    ): Promise<HTMLCanvasElement> {
        //  使用用户提供的html2canvas配置
        const html2canvasOptions = config.html2canvasOptions || {};
        const canvas = await this.canvasGenerator.elementToCanvas(element, html2canvasOptions);
        return canvas;
    }

    /**
     *  生成图像数据
     */
    private generateImageData(canvas: HTMLCanvasElement, config: ExportConfig): string {
        return this.canvasGenerator.canvasToImageData(canvas, config.quality);
    }

    /**
     *  构建成功结果
     */
    private buildSuccessResult(
        imageData: string,
        startTime: number,
        layout: ImageLayout,
    ): ExportResult {
        return {
            success: true,
            fileSize: Math.round(imageData.length * 0.75),
            processingTime: Date.now() - startTime,
            layout, //  返回布局信息用于调试
        };
    }

    /**
     *  构建错误结果
     */
    private buildErrorResult(error: unknown): ExportResult {
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error),
        };
    }
}
