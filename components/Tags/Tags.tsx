import classes from "./tags.module.css";
interface TagsProps {
  tagData: { label: string; value: string | null | undefined }[];
}

const Tags: React.FC<TagsProps> = ({ tagData }) => {
  return (
    <div className={classes.root}>
      {tagData.map((tag, idx) =>
        tag.value ? (
          <span key={idx} className={classes.tag}>
            {tag.value}
          </span>
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default Tags;
