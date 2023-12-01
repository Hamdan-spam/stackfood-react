import React from 'react'
import { useMutation, useQuery } from 'react-query'
import MainApi from "../../../api/MainApi";
import { onErrorResponse } from "../../../components/ErrorResponse";


const getGuest = async () => {
  const { data } = await MainApi.post("api/v1/auth/guest/request");
  return data;
}
export default function useGetGuest() {
  return useQuery("guest", getGuest, {
    enabled: false,
    onError: onErrorResponse
  });
}