import { useState } from "react"
import { ServerError } from "../utils/error.util"

export const useApiRequest = (url) =>{

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
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(body)
            });
    
            const data = await response.json();

            if (data.ok) {

                setResponseApiState((prevState) => ({
                    ...prevState,
                    data: data
                }));
    
                return data;
            } else {

                throw new ServerError(data.message, data.status);
            }
        } catch (error) {

            setResponseApiState((prevState) => {
                if (error.status) {
                    return { ...prevState, error: error.message };
                }
                return { ...prevState, error: 'No se pudo enviar la información al servidor' };
            });
    

            return null;
        } finally {

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