import Head from "next/head";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Box, Button, Container, Divider, Typography} from "@mui/material";
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import type { characterType } from "../../../models";

import api from '../api'
import Logo from "../../../components/Icons/Logo";
import DataTable from "../../../components/DataTable";
import Information from "../../../components/Information";
import Loading from "../../../components/Loading";


const IndividualContact: NextPage = () => {
  const router = useRouter();
  const [charId, setCharId] = useState<string>("");
  const [episodeArray, setEpisodeArray] = useState<number[]>([]);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      setCharId(`${id}`);
    }
  }, [router.isReady])

  const {data: character, error: characterError} = useQuery< characterType | null >({
    queryKey: ['character', charId],
    queryFn: async () => {
      if(!charId) return null;
      const character = await api.getCharacter(charId);
      if(!character) return null;
      return character;
    },
    refetchInterval: 10000,
    staleTime: Infinity,
  });

  useEffect(() => {
    if(character) {
      const numArr: number[] = []
      character.episode.forEach((ep: string) => {
        const num = parseInt(ep.replace('https://rickandmortyapi.com/api/episode/', ''));
        numArr.push(num);
      });
      setEpisodeArray(numArr);
    }
  },[character]);

  useEffect(() => {
    if(characterError){
      console.log('character error');
    }
  }, [characterError])

  const handleBack = () => {
    router.push('/contact');
  }

  if(!character || episodeArray.length === 0) return <Loading />
  return (
    <>
      <Container maxWidth="md" sx={{ px: 0 }}>
        <Head>
          <title>Character Detail</title>
          <meta name="" content="Individual Character" />
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            mb: 6,
          }}
        >
          <Box
            component="img"
            sx={{
              border: 1,
              borderColor: '#00994C',
              borderRadius: '50%',
              maxHeight: { xs: 300, md: 150 },
              maxWidth: { xs: 300, md: 150 },
            }}
            alt="Character Selfie"
            src={character.image}
          />
        </Box>
        <Divider>
            <Typography sx={{ fontSize: "20px", color: "#000000" }}>Character Details</Typography>
        </Divider>
        <Box sx={{ textAlign: "left", mt: "30px", mb: "30px" }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Information information={character} />

            <DataTable episodeArray={episodeArray} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: '175px' }}>
            <Button onClick={handleBack} aria-label="back" sx={{ color: '#808080', marginBottom: '40px' }}>
              <KeyboardBackspaceIcon sx={{ color: 'black' }} />
              <Typography sx={{ color: 'black', fontSize: '20px', ml: '8px' }}>Go Back</Typography>
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default IndividualContact;