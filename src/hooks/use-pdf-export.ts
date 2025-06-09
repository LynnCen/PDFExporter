import { ref, computed } from 'vue';
import type { ExportConfig, ExportResult } from '../pdf/type';
import { VueToPDFExporter } from '../pdf';

export function usePDFExport() {
    const isExporting = ref(false);
    const exportProgress = ref(0);
    const exportMessage = ref('');
    const lastResult = ref<ExportResult | null>(null);

    const exporter = new VueToPDFExporter();

    const exportToPDF = async (
        element: HTMLElement | (() => HTMLElement),
        config: ExportConfig = {},
    ): Promise<ExportResult> => {
        try {
            isExporting.value = true;

            // 获取目标元素
            const targetElement = typeof element === 'function' ? element() : element;
            if (!targetElement) {
                throw new Error('The target element is not found');
            }

            // 执行导出
            const result = await exporter.export(targetElement, config, (progress: any) => {
                exportProgress.value = progress.percentage;
                exportMessage.value = progress.message;
            });

            lastResult.value = result;
            return result;
        } catch (error: any) {
            const errorResult: ExportResult = {
                success: false,
                error: error?.message || 'Unknown error',
            };
            lastResult.value = errorResult;
            return errorResult;
        } finally {
            isExporting.value = false;
            // 延迟重置进度
            setTimeout(() => {
                exportProgress.value = 0;
                exportMessage.value = '';
            }, 1000);
        }
    };

    return {
        isExporting: computed(() => isExporting.value),
        exportProgress: computed(() => exportProgress.value),
        exportMessage: computed(() => exportMessage.value),
        lastResult: computed(() => lastResult.value),
        exportToPDF,
    };
}
