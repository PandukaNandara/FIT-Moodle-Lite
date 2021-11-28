import { IconButton, Typography } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import Kuppi from "../../../models/Kuppi";
import KuppiService from "../../../services/KuppiService";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import DetailCard from "../../../components/DetailCard";
import DetailDialog from "../../../components/dialog/DetailDialog";
import YesNoDialog from "../../../components/dialog/YesNoDialog";
interface Props {
  subjectId: string;
}

type Entity = Kuppi;
const entityName = "Kuppi";

const KuppiSection: React.FC<Props> = ({ subjectId }) => {
  const kuppiService = useCallback(
    () => new KuppiService(subjectId),
    [subjectId]
  );

  const [openAdder, setOpenAdder] = useState(false);
  const [updatingItem, setUpdatingItem] = useState<Entity>();
  const [deletingItem, setDeletingItem] = useState<Entity>();

  const add = async (data: Entity) => {
    setOpenAdder(false);
    await kuppiService().create(data);
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
    if (item?.id) await kuppiService().update(item.id, data);
  };

  const onDelete = async () => {
    const item = deletingItem;
    setDeletingItem(undefined);
    if (item?.id) await kuppiService().delete(item.id);
  };

  useEffect(() => {
    kuppiService().stream((data) => setList(data));
  }, [kuppiService]);

  return (
    <>
      <section>
        <Box display="flex">
          <Typography variant="h6" flexGrow={1}>
            Kuppi
          </Typography>
          <IconButton onClick={() => setOpenAdder(true)}>
            <AddIcon />
          </IconButton>
        </Box>
        {list?.map((kuppi) => (
          <DetailCard
            key={kuppi.id}
            {...kuppi}
            onEdit={() => onEditClick(kuppi)}
            onDelete={() => onDeleteClick(kuppi)}
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

export default KuppiSection;
