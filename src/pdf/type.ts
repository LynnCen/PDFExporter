import type html2canvas from 'html2canvas';
import type { jsPDF, jsPDFOptions } from 'jspdf';

export type PageOrientation = 'portrait' | 'landscape';
export type PageFormat = 'a4' | 'a3' | 'letter' | 'legal' | 'custom';
export type SizeUnit = 'pt' | 'mm' | 'px';

export enum FillMode {
    FIT = 'fit', // 适应模式：保持比例，完全显示，可能有空白
    COVER = 'cover', // 覆盖模式：保持比例，铺满页面，可能裁剪
    STRETCH = 'stretch', // 拉伸模式：完全铺满，可能变形
}

export enum CanvasPreset {
    DEFAULT = 'default',
    HIGH_QUALITY = 'high-quality',
    PERFORMANCE = 'performance',
}

export interface Size {
    readonly width: number;
    readonly height: number;
}

export interface Position {
    readonly x: number;
    readonly y: number;
}

export interface Rect extends Size, Position {}

export interface Margins {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}

export interface SizeWithUnit extends Size {
    unit?: SizeUnit;
}

//  第三方库类型
export type Html2Canvas = typeof html2canvas;
export type JsPDF = typeof jsPDF;
export type JsPDFInstance = InstanceType<JsPDF>;
export type JsPDFOptions = jsPDFOptions;
export type Html2CanvasConfig = Parameters<typeof html2canvas>[1];
export type CanvasConfig = Html2CanvasConfig & { preset?: CanvasPreset };

//  主要配置接口
export interface ExportConfig {
    filename?: string;
    quality?: number;
    orientation?: PageOrientation;
    format?: PageFormat;
    customSize?: SizeWithUnit;
    fillMode?: FillMode;
    margins?: Margins;
    html2canvasOptions?: CanvasConfig;
    jsPDFOptions?: Partial<JsPDFOptions>;
}

//  图片布局计算结果
export interface ImageLayout extends Rect {
    readonly pageWidth: number;
    readonly pageHeight: number;
    readonly canvasWidth: number;
    readonly canvasHeight: number;
    readonly finalWidth: number;
    readonly finalHeight: number;
    readonly fillMode: FillMode;
    readonly scaleRatio: number;
}

//  PDF尺寸配置
export interface PDFDimensions extends Size {
    readonly unit: SizeUnit;
}

//  导出进度
export interface ExportProgress {
    percentage: number;
    message: string;
}

//  导出进度回调
export type ProgressCallback = (progress: ExportProgress) => void;

//  导出结果
export interface ExportResult {
    success: boolean;
    error?: string;
    fileSize?: number;
    processingTime?: number;
    layout?: ImageLayout;
}
