import Head from "next/head";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Box, TextField, Container, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import type { charactersPreviewType } from "../../../models";

import api from '../api'
import Logo from "../../../components/Icons/Logo";
import StickyTable from "../../../components/StickyTable";
import Loading from "../../../components/Loading";


const Contact: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const {data: characters, error: charactersError, isLoading: characterIsLoading} = useQuery< charactersPreviewType[] | null >({
    queryKey: ['characters'],
    queryFn: async () => {
      const characters = await api.getAllCharacter(page);
      if(!characters) return null;
      return characters;
    },
    refetchInterval: 10000,
    staleTime: Infinity,
  });

  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 70},
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'species', headerName: 'Species', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 150 },
  ];

  console.log(characters);

  useEffect(() => {
    if(charactersError){
      console.log('character error');
    }
  }, [charactersError])

  if(!characters) return <Loading />
  return (
    <>
      <Container maxWidth="md" sx={{ px: 0 }}>
        <Head>
          <title>Rick and Morty CRM - Contact Page</title>
          <meta name="description" content="Rick and Morty CRM" />
        </Head>
        <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              mb: 6,
            }}
          >
            <Logo />
        </Box>
        <Box sx={{ textAlign: "left", mt: "46px", mb: "30px" }}>
          {/* <Typography>Contacts</Typography> */}
          <Box sx={{ mb: 3 }}>
          <TextField id="search-box" label="Search Contact" type="search" variant="outlined" color="success" />
          </Box>
          <Box style={{ height: 400, width: '100%' }}>

            { /* //TODO: MOVE get characters api into sticky table for better pagination */ }
            <StickyTable datas={characters} router={router} />
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Contact