const SearchBar = ({ setSearchPhrase }: { setSearchPhrase: (phrase: string) => void }) => {
    return (
        <div className="searchBar">
            <input id="searchField" type="text" onChange={(e) => setSearchPhrase(e.target.value)} placeholder="Nazwa produktu" />
        </div>
    );
};

export default SearchBar;
