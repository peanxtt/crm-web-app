import { Table, TableBody, TableCell, TableRow, Typography, Box } from '@mui/material'
import type { characterType } from "../../models"

interface Props {
  information: characterType
}

const Information = ({ information }: Props) => {
  return (
    <Box sx={{ margin: '0 auto' }}>
      <Box sx={{ mb: 1}}>
        <Typography sx={{ fontSize: 22, color: 'black' }}>Personal Info</Typography>
      </Box>
      <Table sx={{ minWidth: "auto", border: 1, borderColor: '#CED4DA', alignItems: 'center' }}>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography sx={{ fontSize: 18, textAlign: 'center' }}>{information.gender}</Typography>
            </TableCell>
            <TableCell sx={{ borderLeft: 1, borderColor: '#CED4DA' }}>
              <Typography sx={{ fontSize: 18, textAlign: 'center' }}>{information.species}</Typography>
            </TableCell>
            <TableCell sx={{ borderLeft: 1, borderColor: '#CED4DA' }}>
              <Typography sx={{ fontSize: 18, textAlign: 'center' }}>{information.status}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography sx={{ fontSize: 18, textAlign: 'center' }}>Origin</Typography>
            </TableCell>
            <TableCell sx={{ borderLeft: 1, borderColor: '#CED4DA' }} colSpan={2}>
              <Typography sx={{ fontSize: 18, textAlign: 'center' }}>{information.origin.name}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography sx={{ fontSize: 18, textAlign: 'center '}}>Location</Typography>
            </TableCell>
            <TableCell sx={{ borderLeft: 1, borderColor: '#CED4DA' }} colSpan={2}>
              <Typography sx={{ fontSize: 18, textAlign: 'center '}}>{information.location.name}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  )
}

export default Information;