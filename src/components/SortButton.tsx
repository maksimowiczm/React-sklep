import Button from '@mui/material/Button';
const SortButton = ({ setSortType }: { setSortType: () => void }) => {
    return (
        <div className="sortButton" >
            <Button color="secondary" variant="contained" onClick={setSortType}>Sortuj</Button>
        </div>
    );
};

export default SortButton;
