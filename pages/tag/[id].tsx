import { GetStaticProps } from "next";
import { getAllTagsFromPosts } from "utils/mdxUtils";
import Title from "components/Title";

interface ITagProps {
    [key: string]: string | undefined;
    id: string;
}

const Tag = (props: ITagProps) => {
    return (
        <div className="flex flex-col w-full">
            <Title id={props.id} />
        </div>
    )
};

export const getStaticPaths = async () => {
    const allTags = await getAllTagsFromPosts();
    return {
        paths: allTags.map((tags) => {
            return { params: { id: tags.tag } }}
        ),
        fallback: "blocking"
    }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as ITagProps;
    return {
        props: {
            id
        }
    }
};

export default Tag;
