import useResizeHandler from "../../hook/useResizeHandler";


const ChartSkeleton = () => {
    const { isMobile } = useResizeHandler();

    return (
        <div className="skeleton-bar">
            {[...Array(isMobile ? 10 : 20)].map((_, index) => (
                <div key={index} className="skeleton-bar__item"></div>
            ))}
        </div>
    );
};

export default ChartSkeleton;
