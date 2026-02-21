import { authenticated } from "@/access/authenticated";
import LABELS from "@/LABELS";
import { GlobalConfig } from "payload";

const Budget: GlobalConfig = {
  slug: "budget",
  admin: {
    group: LABELS.personal,
    components: {
      views: {
        edit: {
          default: {
            Component: '/globals/personal/Budget/_components/EditDefaultViewLoader',
          }
        },
      },
    },
  },
  access: {
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: "budget",
      type: "number",
      required: true
    }
  ],
};

export default Budget;