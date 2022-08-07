import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

import quotes from './../../data/quotes.json';
import { getTimeOfDay } from './../../utils/dateHelpers';

import Morning from '../../svg/Morning';
import Evening from '../../svg/Evening';
import Afternoon from '../../svg/Afternoon';
import Night from '../../svg/Night';

export default function Greeting(props) {
    const { loggedIn } = props;
    const [quote, setQuote] = useState('');
    let timeOfDay = getTimeOfDay();

    useEffect(() => {
        let chosenQuote = quotes['quotes'][Math.floor(Math.random() * quotes['quotes'].length)];
        setQuote(chosenQuote);
    }, [])

    return (
        <Card sx={{
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: '10px',
            ['@media (max-width: 768px)']: {
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }
        }}
        >
            <CardContent sx={{
                flexGrow: 2,
            }}>
                <Typography variant="h4" component="div">
                    {timeOfDay.timeOfDayText}, {loggedIn.user}
                </Typography>
                <Box sx={{
                    marginTop: '20px',
                }}>
                    <FormatQuoteIcon sx={{
                        width: '40px',
                        height: '40px',
                        transform: 'rotate(180deg)',
                    }} />
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        maxWidth: '700px',
                    }}>

                        <Typography variant="body1" component="div">
                            {quote.quote}
                        </Typography>
                    </Box>
                    <Typography variant="caption" component="div" sx={{
                        marginTop: '5px',
                        color: 'text.secondary',
                    }}>
                        {quote.author}
                    </Typography>
                </Box>
            </CardContent>
            <Box sx={{
                flexGrow: 1
            }}>
                {timeOfDay.timeOfDay === 'morning' && <Morning />}
                {timeOfDay.timeOfDay == 'afternoon' && <Afternoon />}
                {timeOfDay.timeOfDay == 'evening' && <Evening />}
                {timeOfDay.timeOfDay == 'night' && <Night />}
            </Box>
        </Card>
    )

}