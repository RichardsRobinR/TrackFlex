
const Search = ({ searchTerm, setSearchTerm}) => {
    return (
        <div className="search">
            <div>

                <img src="/search.svg" alt="serach" />
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />

            </div>
        </div>


    );
}

export default Search