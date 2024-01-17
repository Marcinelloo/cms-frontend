import styled from "styled-components";
import { Link } from "react-router-dom";
import { createLinkForArticle } from "@/common/functions/articleLink";


const baseUrl = process.env.REACT_APP_IMAGE_URL;

const ArticleTileContainer = styled.div`
    width: 600px;
    -webkit-box-shadow: 0px 0px 15px -7px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 0px 15px -7px rgba(66, 68, 90, 1);
    box-shadow: 0px 0px 15px -7px rgba(66, 68, 90, 1);
    border-radius: 15px;
    margin-bottom: 30px;
    margin-right: 15px;
    margin-left: 15px;
`;

const ArticleTileImage = styled.img`
    overflow: hidden;
    border-radius: 15px;
    object-fit: cover;
`;

const ArticleTileTitle = styled.div`
    font-size: 1.5em;
    padding: 5px;
    text-align: center;
`

const CustomLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: inherit;

  &:hover {
    transform: scale(1.1);
  }
`;

function ArticleTile({ article }) {
    return <ArticleTileContainer>
            <CustomLink to={`/blog/${createLinkForArticle(article.attributes.Title, article.id)}`}>
            <div style={{textAlign: 'center', padding: '5px'}}>
                <ArticleTileImage 
                    alt={article.attributes.Main_Image.data.attributes.alternativeText} 
                    src={`${baseUrl}${article.attributes.Main_Image.data.attributes.url}`}
                    width="100%"
                    height="300px"
                    />
            </div>
            <ArticleTileTitle>
                {article.attributes.Title}
            </ArticleTileTitle>
    </CustomLink> 
        </ArticleTileContainer>
}

export default ArticleTile;