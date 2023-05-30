import { IonItem } from "@ionic/core/components/ion-item";
import { IonLabel } from "@ionic/core/components/ion-label";
import { IonInput } from "@ionic/core/components/ion-input";
import { initialize } from "@ionic/core/components";
import * as helperCustomElements from "$helpers/custom-elements";

initialize({
  mode: "md",
});

helperCustomElements.define("ion-item", IonItem);
helperCustomElements.define("ion-label", IonLabel);
helperCustomElements.define("ion-input", IonInput);
