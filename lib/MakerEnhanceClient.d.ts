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
    }
}
export default function MakerEnhanceClient({ user, id, scriptSrc, }: MakerEnhanceClientProps): JSX.Element;
export {};
