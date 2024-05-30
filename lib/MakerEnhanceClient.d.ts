/// <reference types="react" />
interface MakerEnhanceClientProps {
    user: string;
    id: string;
    scriptSrc: string;
}
declare global {
    interface Window {
        MakerEmbeds: {
            run: () => void;
        } | undefined;
        maker_enhance_engine: {
            page_url: string;
        } | undefined;
    }
}
export default function MakerEnhanceClient({ user, id, scriptSrc, }: MakerEnhanceClientProps): JSX.Element;
export {};
