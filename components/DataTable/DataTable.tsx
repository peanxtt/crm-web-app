import { useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Typography } from "@mui/material"
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import api from '../../src/pages/api'
import Sync from '../Icons/Sync';

import type { episodeType } from "../../models"

interface Props {
  episodeArray: number[]
}

interface Column {
  id: 'name' | 'air_date' | 'episode'
  label: string;
  minWidth?: number;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'air_date', label: 'Air Date', minWidth: 100 },
  { id: 'episode', label: 'Episode', minWidth: 170 },
];

const DataTable = ({ episodeArray }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const {data: episodes, error: episodesError} = useQuery< episodeType[] | episodeType | null >({
    queryKey: ['episodes', episodeArray],
    queryFn: async () => { return await api.getMultipleEpisode(episodeArray); }
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  console.log(episodes);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!episodes) return (
    <Box sx={{ mt: '100px', display: 'flex', justifyContent: 'center' }}>
      <Sync size={25} /> &nbsp;&nbsp; <Typography>Loading Episodes Table</Typography>
    </Box>
  )
  if (Array.isArray(episodes)) return (
    <Box sx={{ mt: '50px', alignItems: 'center' }}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="episode_table">
            <TableHead sx={{ color: 'black' }}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align='center'
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {episodes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((episode: episodeType) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={episode.id}>
                      {columns.map((column) => {
                        const value = episode[column.id];
                        return (
                          <TableCell key={column.id} align={'center'}>
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
        <TablePagination
          rowsPerPageOptions={[10, 20, 40]}
          component="div"
          count={episodes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
  return (
    <Box sx={{ mt: '50px', alignItems: 'center' }}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="episode_table">
            <TableHead sx={{ color: 'black' }}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align='center'
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover role="checkbox" tabIndex={-1} key={episodes.id}>
                {columns.map((column) => {
                  const value = episodes[column.id];
                  return (
                    <TableCell key={column.id} align={'center'}>
                        {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 40]}
          component="div"
          count={1}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default DataTable