import TextField from '@mui/material/TextField';
const SearchBar = ({ setSearchPhrase }: { setSearchPhrase: (phrase: string) => void }) => {
    return (
        <div className="searchBar">
            <TextField fullWidth color="secondary" onChange={(e) => setSearchPhrase(e.target.value)} label="Szukaj po nazwie produktu" />

        </div>
    );
};

export default SearchBar;
