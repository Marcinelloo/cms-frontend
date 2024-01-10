import { getArticleById } from "@/api/repositories/article";
import LoadingContainer from "@/common/components/LoadingContainer";
import { getIdFromUrl } from "@/common/functions/articleLink";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const baseUrl = process.env.REACT_APP_IMAGE_URL;


function BlogArticle() {
    const { articleLink } = useParams();
    const [data, setData] = useState(null);
    
    const { isLoading, mutate } = useMutation({
        mutationFn: getArticleById,
        onSuccess: (data) => {
            setData(data.data.data);
        }
    });

    console.log({data});

    useEffect(() => {
        mutate(getIdFromUrl(articleLink));
    }, [articleLink, mutate]);

    if (isLoading || data === null) {
        return <LoadingContainer />
    }

    return <div style={{width: '50%', marginLeft: 'auto', marginRight: 'auto'}}>
        <article>
            <span>{new Date(data.attributes.publishedAt).toLocaleString()}</span>
            <h1>{data.attributes.Title}</h1>
            <img style={{width: '100%', height: '300px', objectFit: 'contain'}} src={`${baseUrl}${data.attributes.Main_Image.data.attributes.url}`} alt={data.attributes.Main_Image.data.attributes.alternativeText} />
            <div style={{marginTop: '20px', marginBottom: '20px'}} dangerouslySetInnerHTML={{__html: data.attributes.Content}}>
            </div>
        </article>
    </div>
}

export default BlogArticle; 