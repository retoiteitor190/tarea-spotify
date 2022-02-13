import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { getSpotifyToken, spotifySearch } from "../../api/spotify";
import { Card } from "../../components/Card";

const cookies = new Cookies();

function Home() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
        type: "all",
        query: null,
    });
    const TYPES = ["all", "album", "artist", "track"];
    const token = cookies.get("token");

    const search = async () => {
        const data = await spotifySearch(searchQuery.type, searchQuery.query);
        setData(data);
        console.log(data);
    };

    useEffect(() => {
        if (token) getSpotifyToken();
    }, [token]);

    return (
        <Grid container marginTop={10}>
            <Grid item xs={6}>
                <TextField
                    id="outlined-search"
                    label="Search Field"
                    type="search"
                    onChange={(e) =>
                        setSearchQuery((current) => ({ ...current, query: e.target.value }))
                    }
                />
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={searchQuery.type}
                        label="Age"
                        onChange={(e) =>
                            setSearchQuery((current) => ({ ...current, type: e.target.value }))
                        }
                    >
                        {TYPES.map((element, idx) => (
                            <MenuItem key={idx} value={element}>
                                {element}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <Button href="#text-buttons">Guit alejandro Ruiz Moreno</Button>
                <Button variant="contained" onClick={search}>
                    Search
                </Button>
            </Grid>
            <Grid>
                <Button onClick={getSpotifyToken}>token</Button>
            </Grid>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                padding={10}
            >
                {data?.tracks &&
                    data?.tracks?.items?.map((track, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Card
                                name={track.name}
                                artist={track.artists[0].name}
                                image={track.album?.images[0]?.url}
                                url={track.external_urls?.spotify}
                            />
                        </Grid>
                    ))}
                {data?.artists &&
                    data?.artists?.items?.map((artist, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                        <img style={{width:150, height:150}} src={
                            artist.images[0]?.url ??
                            "https://www.wmhbradio.org/wp-content/uploads/2016/07/music-placeholder.png"
                        } alt="Albums"/>
                        <p>Nombre del Artista:</p>
                        <p>{artist.name}</p>
                        <p>Followers: {artist.followers.total}</p>   
                           {/* <Card
                                name={album.name}
                                artist={album.artists[0].name}
                                image={album.images[0]?.url}
                            />*/}
                        </Grid>
                    ))}
                {data?.albums &&
                    data?.albums?.items?.map((album, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                        <p>Nombre del Album:</p>
                        <p>{album.name}</p>    
                        <img style={{width:150, height:150}} src={
                            album.images[0]?.url ??
                            "https://www.wmhbradio.org/wp-content/uploads/2016/07/music-placeholder.png"
                        } alt="Albums"/>
                        <p>Nombre del Artista:</p>
                        <p>{album.artists[0].name}</p>   
                           {/* <Card
                                name={album.name}
                                artist={album.artists[0].name}
                                image={album.images[0]?.url}
                            />*/}
                        </Grid>
                    ))}
            </Grid>
            <Grid item xs={6}></Grid>
        </Grid>
    );
}
export default Home;