interface UseMakerEnhanceProps {
    user: string;
    index?: number;
    scriptSrc: string;
}
declare global {
    interface Window {
        MakerEmbeds: any;
    }
}
export default function useMakerEnhance({ user, index, scriptSrc }: UseMakerEnhanceProps): void;
export {};
