import SubSectionLayout from "../../components/molecules/SubSectionLayout";
import {
  SUBSECTION_CONTENT,
  SUBSECTION_CRYSTAL_TYPES,
  SUBSECTION_LAYOUTS,
} from "../../logic/constants/subsections";

export default function SubSectionContact() {
  return (
    <SubSectionLayout
      content={SUBSECTION_CONTENT.contact}
      crystalType={SUBSECTION_CRYSTAL_TYPES.contact}
      reversed={SUBSECTION_LAYOUTS.contact.reversed}
    />
  );
}
