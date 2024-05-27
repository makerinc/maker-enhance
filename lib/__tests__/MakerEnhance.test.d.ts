declare global {
    interface Window {
        MakerEmbeds: {
            run: () => void;
        } | undefined;
    }
}
export {};
