import { useState } from "react"
import { ServerError } from "../utils/error.util"

export const useApiRequest = (url) =>{
    //Nos conviene guardarlo en el hook porque no es algo que vaya a variar entre componentes
    const initialResponseApiState = {
        loading: false,
        error: null,
        data: null
    }
    const [responseApiState, setResponseApiState] = useState(initialResponseApiState)

    const postRequest = async (body) => {
        try {
            setResponseApiState((prevState) => {
                return {
                    ...prevState, loading: true
                };
            });
    
            // Realiza la solicitud POST
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(body)
            });
    
            // Parseamos la respuesta en formato JSON
            const data = await response.json();
    
            // Verificamos si la respuesta fue exitosa
            if (data.ok) {
                // Actualizamos el estado con los datos de la respuesta
                setResponseApiState((prevState) => ({
                    ...prevState,
                    data: data
                }));
    
                // Retornamos los datos para que la función que llame a postRequest pueda usarlos
                return data;
            } else {
                // Si no fue exitosa, lanzamos un error
                throw new ServerError(data.message, data.status);
            }
        } catch (error) {
            // Manejamos el error y actualizamos el estado con el mensaje de error
            setResponseApiState((prevState) => {
                if (error.status) {
                    return { ...prevState, error: error.message };
                }
                return { ...prevState, error: 'No se pudo enviar la información al servidor' };
            });
    
            // Retornamos null en caso de error
            return null;
        } finally {
            // Finalizamos la carga (loading = false)
            setResponseApiState((prevState) => ({
                ...prevState,
                loading: false
            }));
        }
    };
    

    const putRequest = async (body) => {
        try {
            setResponseApiState({ ...initialResponseApiState, loading: true })
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(body)
            })
    
            const data = await response.json()
    
            if (data.ok) {
                setResponseApiState((prevState) => ({
                    ...prevState, 
                    data: data
                }))
                return data; 
            } else {
                throw new ServerError(data.message, data.status)
            }
        } catch (error) {
            setResponseApiState((prevState) => {
                if (error.status) {
                    return { ...prevState, error: error.message }
                }
                return { ...prevState, error: 'No se pudo enviar la información al servidor' }
            })
            return null; 
        } finally {
            setResponseApiState((prevState) => ({
                ...prevState, 
                loading: false
            }))
        }
    }
    

    return {responseApiState, postRequest, putRequest}
}