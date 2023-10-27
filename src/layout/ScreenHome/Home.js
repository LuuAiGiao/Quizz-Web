import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <h1 className='quiz'>Let's Start with funny quizzes</h1>
            <Link to={'/quiz'}>
                <Button style={{ borderRadius: '50px', width: '380px', fontWeight: 'bold', fontSize: '20px', top: '100px', left: '600px' }} variant='contained'>Starts quizzes</Button>
            </Link>

        </div>
    )
}
