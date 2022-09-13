import ContentLoader, { IContentLoaderProps } from "react-content-loader";

const MyLoader = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
    <ContentLoader
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#c9c9c9"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="0" rx="100" ry="100" width="201" height="181" />
        <rect x="571" y="215" rx="0" ry="0" width="38" height="22" />
        <rect x="1" y="197" rx="8" ry="8" width="203" height="17" />
        <rect x="0" y="233" rx="6" ry="6" width="200" height="63" />
        <rect x="2" y="309" rx="4" ry="4" width="65" height="31" />
        <rect x="94" y="308" rx="9" ry="9" width="105" height="32" />
    </ContentLoader>
);

export default MyLoader;
