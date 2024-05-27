/// <reference types="react" />
interface MakerEnhanceClientProps {
    user: string;
    index?: number;
    scriptSrc: string;
}
declare global {
    interface Window {
        MakerEmbeds: any;
    }
}
export default function MakerEnhanceClient({ user, index, scriptSrc }: MakerEnhanceClientProps): JSX.Element;
export {};
