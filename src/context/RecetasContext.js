import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
    const [ recetas, guardarRecetas ] = useState([]);
    const [ busqueda, buscarRecetas ] = useState({
        nombre: '',
        categoria: ''
    });

    const [ consultar, guardarConsultar ] = useState(false);

    const { nombre, categoria } = busqueda;

    useEffect(() => {
        if(consultar) {
            const obtenerRecetas = async () => {                
                const URL=`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`
                const resultado = await axios.get(URL);
                // console.log(resultado.data.drinks);
                guardarRecetas(resultado.data.drinks);
            }
            obtenerRecetas();
        }

    }, [busqueda, categoria, consultar, nombre]);


    return (
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    );
}
 
export default RecetasProvider;

