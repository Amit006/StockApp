import React, {useEffect} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import axios from 'axios'
// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}


export default function Chart({ companyName, triggerApi, currentTime, clearIntervalFn, stopTimer }) {
    const theme = useTheme();
    const [data, setData] = React.useState([]);
    useEffect(() => {
        let callApi =  () => {
            let url = 'https://finnhub.io/api/v1/quote?symbol='+companyName+'&token=bvjdkk748v6vdbel42sg';
            let result  = axios.get(url);
            result.then((datar)=>{
                if(data.length >= 5){
                    setData(prev=> {
                        let temp = [...prev];
                         temp.splice(0, 1);
                        return temp;
                    }  );
                    let diffMs = new Date() - currentTime.time;
                    console.log(Math.round(((diffMs % 86400000) % 3600000) / 60000));
                    if(Math.round(((diffMs % 86400000) % 3600000) / 60000) <= 2){
                        setData(prev=>([...prev,createData(new Date().toISOString(), datar.data.c)]  ) );

                    }else {
                        clearIntervalFn();
                        let url = 'http://localhost:4001/stock/insertRecords';
                        axios.post(url, data.map( (objData) => Object.assign( objData,{companyName: companyName}))).then( (res) => {
                            console.log(' response: ', res);
                            if(res){

                            }
                        })
                    }

                } else {
                    setData(prev=>([...prev, createData(new Date().toISOString(), datar.data.c) ]  ) );
                }
            });

        };
        if(currentTime.timerStart)
        callApi();

    }, [triggerApi]);

    return (
        <React.Fragment>
            <Title>Today</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            Sales Price($)
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false}  />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
