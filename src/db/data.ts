import axios from "axios";
import type { IEmployes  } from "../types";

const BASE_URL = "https://680fa2d967c5abddd19614ff.mockapi.io/api";

export async function EmployeApi(endpoint: string) {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Xatolik yuz berdi:', error);
    throw error;
  }
}

export async function addEmployee(endpoint: string, newEmployee: IEmployes){
    try{
        const response = await axios.post(`${BASE_URL}/${endpoint}`, newEmployee);
        return response.data
    } catch(error){
        console.error("Xatolik", error)
        throw error
    }
}
export async function updateEmploye(endpoint: string, id: string, updatedEmployee: IEmployes){
    try{
        const response = await axios.put(`${BASE_URL}/${endpoint}/${id}`, updatedEmployee);
        return response.data
    } catch(error){
        console.error('Xatolik', error);
        throw error
    }
}
export async function deleteEmployee(endpoint: string, id: string){
    try{
        const response = await axios.delete(`${BASE_URL}/${endpoint}/${id}`);
        return response.data
    } catch(error){
        console.error("Xatolik", error);
        throw error
    }
}
