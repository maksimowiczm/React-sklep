import { useEffect, useState } from "react";
import axios from "axios";
import { CategoryData, Category } from "./Category";

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';


const CategoriesList = () => {
    const DB = process.env.REACT_APP_DB_SERVER;

    const [categories, setCategories] = useState<Array<CategoryData>>([]);
    useEffect(() => {
        axios.get(`http://${DB}/categories?_embed=subCategories`).then((res) => setCategories(res.data));
    }, [DB]);

    return (

        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.black' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {categories.map((c: CategoryData, i: number) => (
                <ListItemButton><Category key={i} id={c.id} name={c.name} subCategories={c.subCategories} /> </ListItemButton>
            ))}
        </List>
    );

};

export default CategoriesList;
