import styled from "styled-components";

const baseUrl = process.env.REACT_APP_IMAGE_URL;

const ArticleTileContainer = styled.div`
    width: 40%;
    -webkit-box-shadow: 0px 0px 15px -7px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 0px 15px -7px rgba(66, 68, 90, 1);
    box-shadow: 0px 0px 15px -7px rgba(66, 68, 90, 1);
    border-radius: 15px;
`;

const ArticleTileImage = styled.img`
    overflow: hidden;
`;

const ArticleTileTitle = styled.div`
    font-size: 1.5em;
    padding: 5px;
    text-align: center;
`


function ArticleTile({ article }) {
    return <ArticleTileContainer>
        <div style={{textAlign: 'center', padding: '5px'}}>
                <ArticleTileImage 
                    alt={article.attributes.Main_Image.data.attributes.alternativeText} 
                    src={`${baseUrl}${article.attributes.Main_Image.data.attributes.url}`}
                    height="300px"
                    />
                    </div>
                    <ArticleTileTitle>
                        {article.attributes.Title}
                    </ArticleTileTitle>
        </ArticleTileContainer>
}

export default ArticleTile;