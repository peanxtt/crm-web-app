import Head from "next/head";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Pagination from '@mui/material/Pagination';
import TableRow from '@mui/material/TableRow';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, TextField, Container, PaginationItem } from "@mui/material";
import { useQuery } from '@tanstack/react-query';

import type { charactersPreviewType } from "../../../models";

import api from '../api'
import Logo from "../../../components/Icons/Logo";
import Loading from "../../../components/Loading";

interface Column {
  id: 'name' | 'status' | 'species' | 'gender';
  label: string;
  minWidth?: number;
  align?: 'center';
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'species', label: 'Species', minWidth: 100 },
  { id: 'gender', label: 'Gender', minWidth: 100 },
];

const Contact: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState<charactersPreviewType[]>([]);

  const {data: characters, error: charactersError} = useQuery< charactersPreviewType[]>({
    queryKey: ['characters'],
    queryFn: async () => {
      const characters = await api.getAllCharacters();
      setFilteredList(characters);
      return characters;
    },
  });

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const pageCount = Math.ceil(filteredList.length / rowsPerPage);

  console.log(filteredList);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    setSearch(keyword);

    const searchList: charactersPreviewType[] = characters!.filter((item) => {
      return item.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });
    setFilteredList(searchList);
  };

  useEffect(() => {
    if(charactersError) console.error('character error');
  }, [charactersError])

  if(!characters || filteredList.length === 0) return <Loading />
  return (
    <>
      <Container maxWidth="md" sx={{ px: 0 }}>
        <Head>
          <title>Contact List - SleekFlow</title>
          <meta
            name="description"
            content="View our list of contacts with their related information."
          />
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
          <Box sx={{ mb: 3 }}>
          <TextField
            id="search-box"
            label="Search Contact"
            type="search"
            variant="outlined"
            color="success"
            value={search}
            onChange={handleSearch}
          />
          </Box>
          <Box style={{ height: 400, width: '100%' }}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader>
                  <TableHead sx={{ backgroundColor: '#009879', color: '#ffffff' }}>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredList
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((character: charactersPreviewType) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={character.id}
                            onClick = {() => {router.push(`/individualContact?id=${character.id}`)}}
                          >
                            {columns.map((column) => {
                              const value = character[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display:'flex', justifyContent:'center', mb: 1 }}>
              <Pagination
                color="primary"
                count={pageCount - 1}
                onChange={handleChangePage}
                page={page}
                size="large"
                renderItem={(item) => (
                  <PaginationItem
                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    {...item}
                  />
                )}
              />
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Contact