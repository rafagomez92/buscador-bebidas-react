import { useContext, useState } from 'react';
import { CategoriasContext }  from '../context/CategoriasContext';
import { RecetasContext }  from '../context/RecetasContext';

const Formulario = () => {

    const [ busqueda, guardarBusqueda ] = useState({
        nombre: '',
        categoria: ''
    });
    
    // Obteniendo nuestro array de context
    const { categorias } = useContext(CategoriasContext);
    const { buscarRecetas,guardarConsultar } = useContext(RecetasContext);
    // Añadiendo las categorias al select
    const options = categorias.map(({ strCategory }) => 
        <option 
            value={strCategory} 
            key={strCategory} 
        >
            {strCategory}
        </option>
    )
            

    // Funcion para leer los contenidos
    const obtenerDatosReceta = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }


    return (
        <form
            className="col-12"
            onSubmit={e => {
                e.preventDefault();
                buscarRecetas(busqueda);
                guardarConsultar(true);
            }}
        >
            <fieldset className="text-center">
                <legend>Buscar bebidas por categoría o ingredientes</legend>
            </fieldset>
            <div className="row mt-4">
                <div className="col-md-4">
                    <input 
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="Buscar por ingredientes"
                        onChange={obtenerDatosReceta}
                    />
                </div>                
                <div className="col-md-4">
                    <select 
                        className="form-control"
                        name="categoria"
                        onChange={obtenerDatosReceta}
                    >
                        <option value="">-- Selecciona Categoría --</option>
                        {options}
                    </select>
                </div>
                <div className="col-md-4">
                    <input
                        type="submit" 
                        className="btn btn-block btn-danger"
                        value="Buscar bebidas"
                    />                    
                </div>
            </div>
        </form>

    );
}
 
export default Formulario;