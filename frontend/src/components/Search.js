import React, { useState } from 'react'
import { TextField, InputAdornment, Button, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function Search({ onSearch }) {
    const [query, setQuery] = useState('')

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSearchClick = () => {
        if (query.trim()) {
            onSearch(query)
        }
    }

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                mt: 4,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '500px',
                    display: 'flex',
                    gap: 2,
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="映画タイトルを検索"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearchClick()
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleSearchClick}
                    sx={{
                        backgroundColor: '#90caf9',
                        color: '#3f3f3f',
                        '&:hover': {
                            backgroundColor: '#64b5f6',
                        },
                    }}
                >
                    検索
                </Button>
            </Box>
        </Box>
    )
}
