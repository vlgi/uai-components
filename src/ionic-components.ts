import { IonItem } from "@ionic/core/components/ion-item";
import { IonLabel } from "@ionic/core/components/ion-label";
import { IonInput } from "@ionic/core/components/ion-input";
import { IonPopover } from "@ionic/core/components/ion-popover";
import { IonDatetime } from "@ionic/core/components/ion-datetime";
import { IonCard } from "@ionic/core/components/ion-card";
import { IonIcon } from "@ionic/core/components/ion-icon";
import { IonButton } from "@ionic/core/components/ion-button";
import { IonButtons } from "@ionic/core/components/ion-buttons";
import { IonSelectOption } from "@ionic/core/components/ion-select-option";
import { IonPicker } from "@ionic/core/components/ion-picker";
import { IonContent } from "@ionic/core/components/ion-content";
import { IonModal } from "@ionic/core/components/ion-modal";

import { IonPickerInternal } from "@ionic/core/components/ion-picker-internal";
import { IonPickerColumnInternal } from "@ionic/core/components/ion-picker-column-internal";
import { IonRippleEffect } from "@ionic/core/components/ion-ripple-effect";
import { IonNote } from "@ionic/core/components/ion-note";
import { IonBackdrop } from "@ionic/core/components/ion-backdrop";

import { initialize } from "@ionic/core/components";
import * as helperCustomElements from "./helpers/custom-elements";

initialize({
  mode: "md",
});

helperCustomElements.define("ion-item", IonItem);
helperCustomElements.define("ion-label", IonLabel);
helperCustomElements.define("ion-input", IonInput);
helperCustomElements.define("ion-popover", IonPopover);
helperCustomElements.define("ion-datetime", IonDatetime);
helperCustomElements.define("ion-picker", IonPicker);
helperCustomElements.define("ion-card", IonCard);
helperCustomElements.define("ion-icon", IonIcon);
helperCustomElements.define("ion-button", IonButton);
helperCustomElements.define("ion-buttons", IonButtons);
helperCustomElements.define("ion-select-option", IonSelectOption);
helperCustomElements.define("ion-content", IonContent);
helperCustomElements.define("ion-modal", IonModal);

helperCustomElements.define("ion-picker-internal", IonPickerInternal);
helperCustomElements.define("ion-picker-column-internal", IonPickerColumnInternal);
helperCustomElements.define("ion-ripple-effect", IonRippleEffect);
helperCustomElements.define("ion-note", IonNote);
helperCustomElements.define("ion-backdrop", IonBackdrop);
