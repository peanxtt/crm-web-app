import Head from "next/head";
import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";

import { Box, TextField, Container, Typography } from "@mui/material";
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import type { characterType } from "../../../models";
import Logo from "../../../components/Icons/Logo";

import api from '../api'
import Loading from "../../../components/Loading";


const Contact: NextPage = () => {
  const [page, setPage] = useState(1);
   const charactersQuery = useQuery< characterType[] | null >({
    queryKey: ['characters'],
    queryFn: async () => {
      const characters = await api.getAllCharacter(page);
      if(!characters) return null;
      return characters;
    }
  });
  const loading = charactersQuery.isLoading;

  console.log(charactersQuery.data);

  // if(loading) return <Loading />
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
          <Typography>Contacts</Typography>
          <TextField
          label="Search field"
          type="search"
          variant="filled"
        />
        </Box>
      </Container>
    </>
  )
}

export default Contact