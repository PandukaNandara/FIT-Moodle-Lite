import { IconButton, Typography } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import RecommendedReading from "../../../models/RecommendedReading";
import RecommendedReadingService from "../../../services/RecommendedReadingService";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import DetailCard from "../../../components/DetailCard";
import DetailDialog from "../../../components/dialog/DetailDialog";
import YesNoDialog from "../../../components/dialog/YesNoDialog";
interface Props {
  subjectId: string;
}

type Entity = RecommendedReading;
const entityName = "Recommended Reading";

const RecommendedReadingSection: React.FC<Props> = ({ subjectId }) => {
  const recommendedReadingService = useCallback(
    () => new RecommendedReadingService(subjectId),
    [subjectId]
  );

  const [openAdder, setOpenAdder] = useState(false);
  const [updatingItem, setUpdatingItem] = useState<Entity>();
  const [deletingItem, setDeletingItem] = useState<Entity>();
 
  const add = async (data: Entity) => {
    setOpenAdder(false);
    await recommendedReadingService().create(data);
  };

  const [list, setList] = useState<Entity[]>();

  const onEditClick = (data: Entity) => {
    setUpdatingItem(data);
  };

  const onDeleteClick = (data: Entity) => {
    setDeletingItem(data);
  };

  const onEdit = async (data: Entity) => {
    const item = updatingItem;
    setUpdatingItem(undefined);
    if (item?.id) await recommendedReadingService().update(item.id, data);
  };

  const onDelete = async () => {
    const item = deletingItem;
    setDeletingItem(undefined);
    if (item?.id) await recommendedReadingService().delete(item.id);
  };

  useEffect(() => {
    recommendedReadingService().stream((data) => setList(data));
  }, [recommendedReadingService]);

  return (
    <>
      <section>
        <Box display="flex">
          <Typography variant="h6" flexGrow={1}>
            {entityName}
          </Typography>
          <IconButton onClick={() => setOpenAdder(true)}>
            <AddIcon />
          </IconButton>
        </Box>
        {list?.map((e) => (
          <DetailCard
            key={e.id}
            {...e}
            onEdit={() => onEditClick(e)}
            onDelete={() => onDeleteClick(e)}
          />
        ))}
      </section>
      <DetailDialog
        open={Boolean(updatingItem)}
        title={`Update ${entityName}`}
        onSubmit={onEdit}
        updatingValue={updatingItem}
        
        onClose={() => setUpdatingItem(undefined)}
      />
      <DetailDialog
        open={openAdder}
        title={`Create ${entityName}`}
        onSubmit={add}
        onClose={() => setOpenAdder(false)}
      />
      <YesNoDialog
        open={Boolean(deletingItem)}
        content={`Are you sure you want to delete this ${entityName}?`}
        onClose={() => setDeletingItem(undefined)}
        onSubmit={onDelete}
        title="Warning"
        buttonColor="error"
      />
    </>
  );
};

export default RecommendedReadingSection;
