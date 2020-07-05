import React from "react";
import styled from "styled-components";
import { Image } from "react-native";
import constants from "../constants";
import { useNavigation } from "@react-navigation/native";

const UsernameText = styled.Text`
    font-size: 15px;
    font-weight: 700;
`;

const ActivityText = styled.Text`
    font-size: 15px;
    width: ${constants.width / 1.8}px;
    height: ${constants.height / 6}px;
`;

const View = styled.View`
    flex: 1;
`;

const UserRow = styled.View`
    flex: 1;
    flex-direction: row;
`;

const AvatarColumn = styled.View`
    padding: 10px 10px 0px 10px;
    justify-content: center;
`;

const Column = styled.View`
    padding: 10px 10px 0px 10px;
    justify-content: center;
    flex-direction: row;
`;

const PostColumn = styled.View`
    padding: 10px 10px 0px 0px;
    justify-content: center;
`;

const TouchableOpacity = styled.TouchableOpacity`
    width: ${constants.width}px;
    height: 70px;
`;

export default () => {
    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("Detail", {id : "ckbz9m3xjwe1c0975iltbbrbc"})}>
                <UserRow>
                    <AvatarColumn>
                        <Image style={{ height: 60, width: 60, borderRadius: 30 }} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRWxaQyVhGWEVUqTMeX3b95Zy8TDjBkF08szVOLeyMWm38a5db4sX9k6ADA3Va7dsY_6OO0_AsC03lSmyshPPQY9GZFX44ELSKcrhoU9OV8Zi7ePmOg7jfD_e4oE56fYO1KwEbl_bWBI6DiY-PRnqQntJlXfB0gBQO6GMeYJbFTf7uR_BPxMT_d2xcyBn9wNdZtbNoJiVZF7I5kq7K9vJBIbJ_0IsSvyw-61QGtxu-s2aCYSm98JHsCfxEJIltD_TSRBNwau4n8kp61pZF27fUR5NzLbNtqlUL1YvzmK1BNTOGVEUJ-79C0ENyTNj2ydmSpCOYUBRMPggQuJ_T2r4QrpZmhcvFawL52z6_5AjEMLdsS0qS9wujAJcD1Jdo18EIrzb4Zqc9_BlUHzwFVU3gPY6KnUuIx_38drw3fr8EVqDqDzNQlabkIxy4&usqp=CAU" }} />
                    </AvatarColumn>
                    <Column>
                        <ActivityText>
                            <UsernameText>
                                johndoe123
                        </UsernameText>
                            {" "} liked your post.
                        </ActivityText>
                    </Column>
                    <PostColumn>
                        <Image style={{ height: 60, width: 60 }} source={{ uri: "https://prismagrapp.s3.ap-northeast-2.amazonaws.com/1593360346499" }} />
                    </PostColumn>
                </UserRow>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Detail", {id : "ckbp85iinf9a40975ppmwnvj0"})}>
                <UserRow>
                    <AvatarColumn>
                        <Image style={{ height: 60, width: 60, borderRadius: 30 }} source={{ uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAsJChYVExcWFhUSGBcYDRENERgYDRUNGBEZHxUXGB4WGBkVGCEeGhcfGBgaHSkdHyMlJiYmFxorLiokLiElJiQBDAwMEA4QFxARFyUdHRUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlLSUlJSUlLSUlJiUlJSUlJSUlJSUlJf/AABEIAMMBAgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQQFBgcDAgj/xABBEAACAQIFAQQGCAQFAwUAAAABAgADEQQFEiExQQYiUWETMnGBkaEHFEJSYnKxwSMz4fAVgqLC0SSS1BY0Q1Oy/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAECAwQFBv/EACwRAAICAgIABAQGAwAAAAAAAAABAhEDIRIxBBNBUSIyYcEFcYGRsfAUofH/2gAMAwEAAhEDEQA/AMvCSxdnEUNqNpWg8kMDjdEsi0mRZpq1l0yFzDGgMAJAtm9l5kTUx7E6jLnKiHqW1820KSfuyvUM8YVdVttUi6+LLCw4jSVOfsT4ms5dnAdBvFxGaBeszPCZi1PrHFfNS46yXNC4s0Whmyt1E918UGEytMa6m4JklTzxrWa8anEXFljxpBvxIX0+hriNKmb36Gd8rwzYp7Wa2rSAFLFifCwPH9nxjKaWxpWWjAZtrFubR5XxF+dvb3Y3pdlGXQBUpq2+lGY3aw30gEbDnYScw/ZgsoF2sG3JpVCCOpvZb3J2kVmQcSstUG5HA6xTmGkcyVxeSKCyrUUBOS6tRYb+LlVPuBlXzbJq9NQysrKTqvddQXoVS5DfG56CPzohxY2xuaM7AqGKjqFNvPeT+VZkNIF5nrMxa5Zyd+WOqw8r7TtRxrJxCOTexuJp9bMRbmM/8SA6yhHNXPM5vmDnraT8xC4ssub5wLWBkZhqgbe8gWcncm89U6rLwZXztglRd8NWCx62Y2HMoqZiwnirjnbraT8xUHEl85zTX3QZXohN4SqUuTGlQ/y7HNSbnaXvAZ4rqLneZrPaVWXgkRxnXYNGmV8YGHIkDjHBvK2MxqDa85vjHbrLHkQuLJnDYoI17y0UM3GnmZsXJ3uZ0XEsNg0islBxL02bC536mEonpm8TCS80OJyMAZ5JgDKESHlMXi1E2i4ed6g2m1QTgZXKpEaYRag3ni8xyVM0p2j1CJeLEMIQhAAAvNO7LYBcPh/rVatTo02pBQ59be5HowRctY3tbkjwMpHZ/LPrOICsStJFOIxL/wD10l3O/idlHmw8J1zrMmxNYKi6aVNfQYSkt9NFBsAB948knckxNX2FmnYftvllDu0xiL7K1ZsMarPa27FmDnjjgeEs2QZ6uMLejqYZ1Ck9ys4qruLB6T0lKj1t79BzfbEsL2YrOAzOq36buY6/9OYnDstajWs6nWpW9JlPkbn58xc49In5cu6PoCtRVxpdFdfBlDj4GV3MuzisC1HUrDvFNZVX8gTwfbt7JCdk+3AqkYfHaaWIFkVz3Er+3oj+XB6W4mgwcVJbIptGI5pgFZaj06T0ayK6VEagaWoHk925JtvzYjpM/qLYke39Z9A9scr10vrVJf49BdVwo1VaYPeQnrYXYewjrMVzqlWZ9dRGW7FbeiWkBYC+y7f37oRTWhunshYQtCSIhCEIAEIQgAQhCABCESACwvEhAAhCEACEIQA82igT3aAEEKx1h47fiNKUedJ0cLXHZjyfNZHVhG8eVhGhEx5UuRqxu0JFiQlRM9XhEiwAsvZ4k4XGoljUdKCKNrsl6pdd/Gy/KL2cwl6rOy+q3Xob2kFg6tRKimkSH1C1r2bcGxHVdtwdpolfLEWiKqpUF3a6d5tyxtdR3jsbbSGR/DRPGviJnDlSBwR1tZp1r1EC9427v5vlKjgqdVWZqaOpDaXRk03JLbDvG/HnyJcBgGrYYNYq+2odR4/KZmuJrT5IqeLy360SEpsfBmZU+FzvLNkOW5nQUA44CmFCimaQxWkAbAM47tvIkSNwuSVlrC9TSg7z3RHN9/VLg2HHwNrS84KiEpldRYdCY+dKkyEopvaO2ExmoNSruraldQxUJrW1iCBtxeZV2wy8ox0rqQqGSzVGLbc95msNx4deJe8dQVxrIY6LtYdbHbbqd5EZ3lYxGEqAKWcf9RTV2LOANqgW9yOL28vG0I5m2kyMsKUXJGPkEGxBFuh7sQ2853q07MQeAwUlVCjcdB1/eeHokezxPcHz/SazMcokWJAAhCEACEIQAIkWEAEhFiQAIQhAAhCEAPQM6qJ4AnZJZBWyuTo6IJ3JnAGdQZdKXFaK1Hk9nCuYzJki41RnVS0zydl8VSOMITTuzX0fK6rUxpdSVFQUE7jBenpHPBP3RuPEcSnLmhijym6JJNmZRZt2YfRzgXpkUfSUamnut6Vqy3/ErHcewiZHnOU1cHWajVADDdWHquvR1PgZDF4nHlbUXsHFo44HFLTJLU0fya6keNmB2+E2bszmC1cMrG4LjV6wcqRsbmwB3vvYTDZoHYrNF9A9B3UVBXV6AZgC6stii+Nit7fik8itWieNpOmXguiNchQC2/C87c9J7w2c4cAkVARqCrZS+q422W5PuEhXrIl6ldgtNW3v3tR6ADryI6wWpqnpaGBZSbrrfRhb7X9Xn5TMk2am0OBjQH7ynSWPozvZhfbY7j2GTAr6ksJB4+sSVp1cO6uzGzJVSsBYkXaxBHBN7R/g/UH5d5GVx0StMcIyjZmVQ1l3YLe3esPcpkZUzaicXZWGmmhpahupZr3APW2w9sd4umrU6oNv5DWJ+zcG9pXOyo02NSkGV9K3K7AgADe1xyTzILehS6ZV+0Nanh8Q6/VMNUOrXTqOtWkWVgrAstGqqNa9rkXuPKV/FZizW008PT8QlLU3tZ6hZvn8Jo/bnLwaYr01pkqqUipVGKgEsCpPS1xtvaZZiKJWx271+DqsRzby3E3wdxMUuzkzseWY+1i36zzFiSZEIQhAAhCEACJFiQAWJCEACEIQAIQhAD1qnoNE9GYaZNOhNJjlTtPYbaNgSJ4d4nKwUaJBSLRvV3nBHiu8gWJaJPszQWpmGFRiNJxdLVfhrMDp99re+b/T7uIcEE6qS1Q2nix0lSeB9kge3wnzXSqsjq6kqyuroRyrA3BHvE2TKe2tHEUxqIp1Qo1qWsGNt2Q9R5cicX8Yx5XGMsatdP6fUIyUezQCdgfcZlP0somrCtt6QrWQ8XKAoRc+RJt+Yy0VO1NGmpZqi6QtyOSR5Abn3TJe0+etjq/pCulVUpRXqFvff8XslP4ZjyTyrJKLjx79nr0+4OakqWyBl07L9j62IVMUatOjSUtiFYqarkU23YKLbXHjKYBfYdbAe+aDUzyoFTBUmIplEwJA7upB6wv+LvAz0JW3RYUWjiadyA9N++hK6SCDsd91MRq1VSVVKjr6vfrs4I8wdvlIrKWNLEGkNWiorPTXT3UIG48rx/ic/VLAX9Y/Z6g2I+IImRN8nCPaNGHNGUfi7J7LaYRe7TVC3ecLTCC/ujo2UHj70q1PtSvBR7+7ecnzGriW0qNKH1iOg8z+0qyKS7NCal0P8XmwVHI3B7inoxvY2+M75ZWUIV+yjoysV1aCDve/Um+552kFnFEBaaC4UOFNvZx74+yjtDRoCtTepSZt6osp1uB0O2ksAOBvtxKoxb6HNpIk81pCrRqaQhYJ3VbUqk+BsRvuPl4zKMwoVNZLIwXghFvxcgMd9Iv0PG201bAYgVKp1ozqzM2kMymxY2Jsbja3xnfOuwuHrqWopTp1D37N6Qox5JYJUBLH7xJm3DJOOjJkjJPZhbi3QjyPP6C88y1Zn2Rx9ENqwey+q9KocRqAPIX0rNpsSfVvt7ZVmFiQdiNiD3SCOhE0FYkIQgIIRYkACJFiQAIsSEACKYRIAEIsIATD0hGlRRPT4iNnq3khIUicXE9a54YyNDPF4XiQgM9QiCLAQt4s8iehAB/k1AVcVh6bX0viqSNbmxYXm1U8kwq/WiuHpllrhkJXUyN6Km10Y7jdidupMxfIqwTGYZyLhcZRYjx74mkUO1VV8ZWomgopVcVVpFtTXplV9GLm1rn0d7ecxeJhklkg49Lvf1ExvjUZHFRVOpHDlhb1eDz5HjyiZhgb4iopVvR1qK42k4W4VwFRwbere6m3jJjEYU1GCfeupvwR1J90mvqirRFJfVHjyxPLHzhODjmWSPtTFhg3Jv0M8w2WgG7Pf/TLHhAqLZRGGKwumo2krbUVazdQbHidh3R+sWZ2zfjSSo6V8P6V1W9rP6UnoAoB46+yReMyGiqB6SsCGFW+rUSDcjV03FjYbD9bH2dT0teoSLhaDH/Uv9JMUsuKGmum6lRSqDpYA2PwAlD5xriOTjdMqGWUy5OprMeB5Sw0lqKNIqOB4ByP3kGEFOsyhSrU6ptzpdb87kkG1j4WvxJ0YkGCW2WuWkd9DHksT4ltUj8zyOhiVIqoC3R17jjawOoc287iP6dcGPKbAySuO0yMqapox3PeytXDAuhNWkNyQO9TH4lHIH3h7wJWJ9F1MOGGwmedp+x5YtWwqgNuz0hsH808G/Dweljzqx5vSX7maeH1j+xm8J6ZSCQQQRcEHYgjkGeZpM4QIhCACQhCABCEUQASEWEAFMLT2s6qBJRRFujjonNhJNaYtG2IpW3EcqFFtsZQhCQLBRFnmeoCCKIkIAO8vYCvSY8DEUmPsDi8+gq9IKcZYDvYdKwGkcimw/2CfOYPh7ptWF7WCpWw4Wnqp4jDjDvdrMrBHJPhyCLTJ4rFKbjx9BPsdYSsG0VBw1IMD7QPnHOLxJSk7/cR38rgEi8r2Qm2GVbsTTd6JvyLHa/utHWc4jThKni+mkPjc/IGWcOWWMfcshLjicvYg8mpviKVU6tISq2/XWXckn4ge6O6VMIjtiHVFRtzvdtjZVXlmNjsJXqeZVsPq9EyjWgV70w17b3txe99/MxjrqVW9JVdnJ6noo3NhwAbAbeM1f4EpTfJ6v8AUh/mRUFxWy4dmM3vjmJBRHoPRpJ62kD+ISxH2yE95IHQTQGxVqYa9+6EPkRq/W4mMUKrUmp1B6yVUxFvEhg1vZsBNWdStTTc/wAim+n7O7Nx57W+Ep8diWOUeOk1/AeHyPJfLsZY/C6yKnXT3rdRxv7rSHUsJYHdjtYWjGtR6iYPU3x0tjVGMd0sSRzIfE41aZsxAiUsar8HaFErTLfhsSDHToGEquHqkH9ZN4fEGF+jFTRUu1vZT096tEAVhyNgK4Hj4P4HrwfEZXUQqSrAqykhgVIIINiCDwRPossGFjKp2l7LpigXXSlcL3X092pbhalvhq5HmNpfizV8MuirJiv4l2Y7AxxjMJUoVGp1UKOuzA/qDwQehGxjczWZAiQigQABFAigT1aMDzaEWEYCAxddoMJyisB/SrbTxWe4jUQJiCjxaLEvC8AC0WEIAEIQgAS0ZBWKvgz4Y0p7LsP2cyryx5Lg6zU0q0qT1AmYJq0oXKWUNcgcDbmDkltugabTo0LKjqFRhazOb2tcOpKNf3qIx7QNZEp+LNVv5ABR/wDpvhOHZes2qsrE6Tiq1VOdrubg+BB/Wee0bXrEDoiL5dW/3CXYIXlV+mzNknUGl66/2RWAwP1nEU6dyFZmaoRa6IBckXNr9B5mOs5w6Liai0wophwqhbMAoUGwttzt7o0SmByBeDmw/SdLi+XK9V19zI5aqjgg1OAeC6qf+4X/AHm0ZjSAKN+E0ifmP90xJ3tuOR3h7RxN0oVVr0EYbo9JHBHgQCCPOcn8U04S/P7GzwkuLZCuI2qg9JJ1aWg2Yew9DObICJzqvaOpytFGzLLmrPddGod4a7svsAH67yPVmotpqKFbpbvK35T+3Muj4cajYe+NsbldOqmllFtreVuLeEXJ9McfcjMNi1MmKGIEz7NcPVwbXVyyeDesPf1ETBdo7EK23dX5i/7yXkuS5RG8iTpmo06wMdKbyl4TNlYbNJalmPnKWmuya30dc/yGljael+5UX+VUC6mp+RH2kPUfCZDm+S18G+ishAPqON0qeat19hsR1Am1UsYrdZyxuMpBNNVUem7BGR0FVW36g+HN5djz8dPoryYeW12YOJ6Ams4rsLgMQS2FxD0WP2Cn1imD1sCQwH+Yyp5x2Gx2GBYItemLtrosXIHi1M94e4EDxm2Mk+jHKLXZVQIkS8QmTEeoTzeEAOrCcCJ3JnNjExI8ARSIgM6gXiGNjCdHE5wGELwhAAvFBiWigQAWaN9F+JK1K6FwqlKdSx41a9O3S5uo+Ezm0vH0aOBj3Um2rCOo7uoEh6Z4mbxivBP8hMTKcYy5i9IWA+u4r3XLXHxEk86P/UPf8Hv7g3kXhMhxGIx+IegBalmFfvO2xIqE6fEmxkjn5tWBsRekm3hyCPlN3gs0Z5OPK2oq/p1RkzxqOvcYFx5zhVeeS041WnWMqWznVeXLsZ2pWiBhsQ2mmWPoah4pEm5Rz0W+4PS5vtxRXM4sZl8Rijljwl/w0wfF2j6NIBHKkHvWNmB8/wCs4nBqeAw9jah85iWTdpsXg7LTqK1Mf/HUXWg/LuGT2A28pcaP0kDT38K1+pTE7fNbicSfgc0H8O0ao5UXKrl4G4Yj2p/WNmwg+83ut/WU3FfSMT/LwY9r4kt/pFP95Vsy7U43EAq1T0aG6lKSmlceBa5b52kF4TPJ71/foS85+5K9tMdhxehSCvVv/Fct6X0Q6op41nrbgX6zPqw3H5R8iR+0dWtxONcbA+1f0nQjhWPHS2RU3KWwoYt6fBNvAywYHPOA3wPPu8ZWLQtKZRjLtFqlKPTNKwmYhuGnSvU1ON7j9z/Ymd0MWydSR8/jLJlePDm2rfz6TLkwVuJqx5rdSLjhXZd1vceEt+V48tZWO/WVDBP4iP6VUq1xKMcnCRbkipohfpI7MhQcbRQDj6yqrsQTYVdut9j43B6GZbPo/DYhXoslUBkZSjKV1AgixBB5uDKDW7D4FWYmviFUsSi6qa6BfYamBJnQjkVGGUHZl1oTQ27LZfc/x6/JH/u6f/jQk+aIcZexn5M8ExYkYhAJ1UzxCACtPGmerxLwA82haeoXgAmmFosLwGFpfvovwDVMZUqKBop4chmN9mZhYC3WymUEGbl9FmE0Zc1Q81sVUcflW1MfNT8ZGcFOLi+mI71vQZSjF3s2IxdXEsxU2Go3IUeVwAJSe0Ob0cXUWpRYkqmip3dFjqJB992k99LoH1fDGwuMVUUHrYpc/oJn+Q5VWq0q1ZR/DRBbY/xXBBKr5hdR94HWV+E8NjwZ/Nt3L6+5Xli5p/weyZyqNPJec2eegswpHhzOJMViTOJMpky6KOhMcA2EZiO1lctskzyxPkPH+/74nIidyJwcyDQI8Gc6o7v+YfMH/idJ4qeo3+X9f6yElcWWR00NokITKX2E90qjIwZTYjgzxCAWXLKu0i3C1e4fVv8AZPv6e/4y1pjqbWKspvx3pkU906rL6rMvsYj5SmWCMnZZHNJGxYjHulPUoZgOdKlreF7SoY3MBVY6hU1H1QG/a0jsh7S1MPUtUZ3pstmG2pD0ZfH2ec0vAYqhiFDKyPq67X9hHQ+UTjx0TjK3aM9+rVfu/wB/CE0Zko3PcTk/aEJXyZbbMLvC86PTIPBnO01mILwvFhAAhCEACEIQAIRQhPAMChHQwA90KLO4VFdnZtKKql2Y+AA3M+jeyWDbD5dhqbqUdaA1qeVYksQfO5mZfRxRpIXxLt3/AEv1JAeEBVWJ9pNh7vOaj6bUbKx3UqO9psSNufOQlOiajeyF7Y5MuO9Cpq6adOuz1FC6me4tZT9k8/GJRopTRadNVREXSijgD9z4nrPdfFWAAG5WQuLzEIDcyhylJ0WpRijPs3omjXqra1qr6fykkgjysRImm5N/ff4Sdz7EGvdgN1Xny8JDZelw56Bfn0E7MJuXFP2OfKMYptHJHN9/fPTixjlaQAA8dRPs2AnB13tJtNIgmm9HiOaJ2jcCAbTEyVWd3e20bmITeErbsko0BnlvVb8v6bxRHOGpAnvcG6/EWirkqHdEXC0mmwQ1WtHVPLx4TJRbZW7QtJx8JZrWnr6jfYDmFByIECFpN18Bo6SPxFOwhQJjUSUy3N6uHBVGIVmYm1r3Khb/AAA+fjIsRY1oHsmP8Wb75/7TEkPaEl5kvcj5cfYvmOyCxBUe2Q2NyJlGoD2iak6DqBOdfCK6nYRaC2YnVolDYiJRTUbS49ocqsCwEqNA6XF/vbyNEr0SaYC44jU4Ih7WluwdNWUH8M4YuiFcNb7W8dC5EF/hhI4jSlgjr0kcS/UMOpUGNnwAuWA+1Cg5EEmA24nM4UFtNpZDSst7Su0cUDXIIt3oULZZuzuFGr0GlNLsXJZdViF6eGw59sn8y7RYBm9HRraH1adXo29Httv/AMiQeGIG+9irIbc2KlTb3GVDEYKqrmmQpBJCtrVdPeuDv53285VkTvSNfh+Di1J9PS/P+/oXzMsW2HsQyurLqVx3iL9LRgct101d6i6nbUlJG1kJb13cbAk/ZHx6TgmEWoUDuzAIiGzaQbC1x/fSTopBCungKFHsEcIcVZRlknJpde/uV+vgApC2sPCVmjhyjVqfhWVR+Xcg/C00LHgEAyr5pQCsXAJLqqMRbu2uPj/zNvh/mM2V/BRCuBrsOiC1utyTf5xpU5No+1Kt7atRXSL9OgjWoLCw5PymuS0UxZwPiJ5biCbbfD2xSJV2i3o5QBnoT16LqZVTJ2AQnccR/cFLr0tfyInCg5TZhdTOjjSdS7oef6+EsjrZXLZOMFZabX9ZFY+228fUKY6yKwxDUAQb6WK+Y67/ABknhKlwJkmqk0WJ2hrjaahwY8weHBN43zGncXHSdsuq8XkRnfMcGCt7SlZqhVrdJo2IAZDKnmOFDg+MAXZU4Ce6lMqbGeREWi2hFhADa8Sxud53w/EWEGVkXnSgodvsmZVjRap/m/eEIPoki25Qe4Pyx1jR3DCEZEksq/liOKY598IQEM6vWUavtidtu9+8IRMaLhhPVEhc8HeU/ihCMPUmMAe6vuk5V9UQhAR4r/y5XMbx/m/YwhLsPzIjk+UjDTHgJGYoWsIsJul0ZofMMX5nUwhKV2aGc2khg+8pB37v7QhEuyL6OVP1iOnhHNEbsOmniLCSj2KXR0wW1RlHBTceMmML6sITPm+YnHo9VeDOeH9SEJQTHSVDp5MjsT1hCAFXxfrGNjCERYhYQhAZ/9k=" }} />
                    </AvatarColumn>
                    <Column>
                        <ActivityText>
                            <UsernameText>
                                mel_foodieblogger
                            </UsernameText>
                            {" "} mentioned you in a comment: @lily How's it going?
                        </ActivityText>
                    </Column>
                    <PostColumn>
                        <Image style={{ height: 60, width: 60 }} source={{ uri: "https://live.staticflickr.com/5463/30713447312_46304e64cd_b.jpg" }} />
                    </PostColumn>
                </UserRow>
            </TouchableOpacity>
        </View>
    )
};