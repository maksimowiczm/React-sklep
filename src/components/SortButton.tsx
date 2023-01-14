const SortButton = ({ setSortType }: { setSortType: () => void }) => {
    return (
        <div className="sortButton" >
            <button onClick={setSortType}>Sortuj</button>
        </div>
    );
};

export default SortButton;
