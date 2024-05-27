/// <reference types="react" />
interface MakerEnhanceProps {
    user: string;
    index?: number;
    loadingHeight?: string;
}
declare global {
    interface Window {
        MakerEmbeds: any;
    }
}
export default function MakerEnhance({ user, index, loadingHeight }: MakerEnhanceProps): JSX.Element;
export {};
