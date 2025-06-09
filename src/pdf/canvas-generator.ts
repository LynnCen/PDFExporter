import type { Html2CanvasConfig, Html2Canvas, CanvasConfig } from './type';
import { CanvasPreset } from './type';

export class CanvasGenerator {
    private html2canvas: Html2Canvas | null = null;

    //  默认配置常量
    private static readonly DEFAULT_CONFIG: Html2CanvasConfig = {
        scale: 3,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        removeContainer: true,
        imageTimeout: 0,
    } as const;

    //  高质量配置预设
    private static readonly HIGH_QUALITY_CONFIG: Html2CanvasConfig = {
        ...CanvasGenerator.DEFAULT_CONFIG,
        scale: 4,
    } as const;

    //  性能优先配置预设
    private static readonly PERFORMANCE_CONFIG: Html2CanvasConfig = {
        ...CanvasGenerator.DEFAULT_CONFIG,
        scale: 1,
        imageTimeout: 5000,
    } as const;

    private async loadHtml2Canvas(): Promise<Html2Canvas> {
        if (!this.html2canvas) {
            const module = await import('html2canvas');
            this.html2canvas = module.default;
        }
        return this.html2canvas;
    }

    /**
     *  将元素转换为Canvas
     * @param element - 目标DOM元素
     * @param userOptions - 用户自定义配置（会覆盖默认配置）
     */
    async elementToCanvas(
        element: HTMLElement,
        userOptions: CanvasConfig = {},
    ): Promise<HTMLCanvasElement> {
        const html2canvas = await this.loadHtml2Canvas();

        // 配置合并：默认配置 + 元素自适应配置 + 用户自定义配置
        const elementAdaptiveConfig = this.createElementAdaptiveConfig(element);
        const presetConfig = this.getPresetConfig(userOptions.preset || CanvasPreset.DEFAULT);
        const finalConfig = this.mergeConfigs(presetConfig, elementAdaptiveConfig, userOptions);

        try {
            const canvas = await html2canvas(element, finalConfig);
            this.validateCanvas(canvas);
            return canvas;
        } catch (error) {
            throw new Error(`生成Canvas失败: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     *  创建元素自适应配置
     */
    private createElementAdaptiveConfig(element: HTMLElement): Html2CanvasConfig {
        // 获取元素的实际尺寸
        const rect = element.getBoundingClientRect();
        return {
            height: element.scrollHeight || rect.height,
            width: element.scrollWidth || rect.width,
            scrollX: 0,
            scrollY: 0,
            windowWidth: element.scrollWidth || rect.width,
            windowHeight: element.scrollHeight || rect.height,
        };
    }

    /**
     *  配置合并策略
     */
    private mergeConfigs(...configs: Html2CanvasConfig[]): Html2CanvasConfig {
        return configs.reduce((merged, config) => ({ ...merged, ...config }), {});
    }

    /**
     *  Canvas验证
     */
    private validateCanvas(canvas: HTMLCanvasElement): void {
        if (!canvas || canvas.width === 0 || canvas.height === 0) {
            throw new Error('The generated Canvas is invalid: size is 0');
        }
    }

    /**
     *  Canvas转图像数据
     */
    canvasToImageData(canvas: HTMLCanvasElement, quality = 1): string {
        if (quality < 0 || quality > 1) {
            throw new Error('The image quality must be between 0 and 1');
        }
        return canvas.toDataURL('image/png', quality);
    }

    /**
     *  获取预设配置
     */
    private getPresetConfig(preset: CanvasPreset): Html2CanvasConfig {
        switch (preset) {
            case CanvasPreset.HIGH_QUALITY:
                return { ...CanvasGenerator.HIGH_QUALITY_CONFIG };
            case CanvasPreset.PERFORMANCE:
                return { ...CanvasGenerator.PERFORMANCE_CONFIG };
            case CanvasPreset.DEFAULT:
            default:
                return { ...CanvasGenerator.DEFAULT_CONFIG };
        }
    }
}
