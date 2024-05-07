import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ExpandLessOutlined, ExpandMoreOutlined } from '@mui/icons-material'; // Import ExpandMoreOutlined for "Turun" buttons
import ButtonPrimary from '../button/ButtonPrimary';

const StyledTableCell = styled(TableCell)(({ columnIndex }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#E0E0E0',
        color: '#1F1F1F',
        fontSize: 16,
        fontWeight: 600,
        border: '1px solid #E0E0E0'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        border: '1px solid #E0E0E0',
        minHeight: 20,
        verticalAlign: 'top',
        borderRight: 0,
        borderLeft: 0,
        width: columnIndex === 0 ? '60%' : '40%',
        verticalAlign: 'middle',
    },
}));

function createData(category) {
    return { category };
}

const getStyledRenderCell = (backgroundColor, textColor) => (params) => (
    <div>
        <span style={{
            color: textColor,
            backgroundColor: backgroundColor,
            padding: '4px 8px',
            borderRadius: '24px'
        }}>{params.value}</span>
    </div>
);

export default function UbahMatrix({ onOpenSecondModalTable }) {
    const current_category = 'Promotable-4'; // Replace with your current category
    const rows = [
        createData('High Potential'),
        createData('Promotable-2'),
        createData('Promotable-3'),
        createData('Promotable-4'),
        createData('Sleeping Tiger-2'),
        createData('Solid Contributor-2'),
        createData('Sleeping Tiger-1'),
        createData('Solid Contributor-1'),
        createData('Unfit'),
    ];

    return (
        <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 100 }}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell columnIndex={0}>Ranking</StyledTableCell>
                            <StyledTableCell columnIndex={1}>Aksi</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => {
                            const distance = index - rows.findIndex(item => item.category === current_category);
                            let direction;

                            if (row.category === current_category) {
                                return (
                                    <TableRow key={index}>
                                        <StyledTableCell columnIndex={0}>{getStyledRenderCell('#FFF6E9', '#FFA726')({ value: row.category })}</StyledTableCell>
                                        <StyledTableCell columnIndex={1}></StyledTableCell>
                                    </TableRow>
                                );
                            } else if (Math.abs(distance) <= 2 && distance !== 0) {
                                if (distance < 0) direction = 'naik';
                                else direction = 'turun';

                                let label;
                                if (Math.abs(distance) === 2) label = `${direction === 'naik' ? 'Naik' : 'Turun'} 2 Level`;
                                else label = `${direction === 'naik' ? 'Naik' : 'Turun'} 1 Level`;

                                return (
                                    <TableRow key={index}>
                                        <StyledTableCell columnIndex={0}>{getStyledRenderCell(direction === 'naik' ? '#F5FFF5' : '#FFEDED', direction === 'naik' ? '#66BB6A' : '#F44336')({ value: row.category })}</StyledTableCell>
                                        <StyledTableCell columnIndex={1}>
                                            <ButtonPrimary
                                                icon={direction === 'turun' ? ExpandMoreOutlined : ExpandLessOutlined}
                                                LabelName={label}
                                                padding={'6px 16px'}
                                                onClick={() => onOpenSecondModalTable()}
                                            />
                                        </StyledTableCell>
                                    </TableRow>
                                );
                            } else {
                                return (
                                    <TableRow key={index}>
                                        <StyledTableCell columnIndex={0}>{row.category}</StyledTableCell>
                                        <StyledTableCell columnIndex={1}></StyledTableCell>
                                    </TableRow>
                                );
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            
        </div>
    );
}
