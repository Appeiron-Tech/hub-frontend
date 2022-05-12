<template>
  <div>
    <q-card class="card-products">
      <q-card-section horizontal>
        <q-img
          v-if="props.product.images?.length!! > 0"
          class="col imageProduct"
          :src="props.product.images![0].src"
          style="height: 290px"
        >
          <div class="absolute-bottom-right text-caption">
            Cantidad de imagenes: {{props.product.images?.length!}}
          </div></q-img
        >
        <q-img
          v-else
          class="col imageProduct"
          src="@/assets/no_image.jpg"
          style="height: 290px"
        ></q-img>

        <!--<q-icon  @click="$refs.fileInput.click()" name="edit" class="text-green" size="1.5em" />-->
        <q-icon
          @click="openModal"
          name="edit"
          class="text-green"
          size="1.5em"
        />

        <q-card-section class="productInfo">
          <div class="row justify-around" style="gap: 5px">
            <div class="col-12">
              <q-input
                outlined
                v-model="props.product.name"
                label="Nombre del producto"
              />
            </div>
            <div class="col-12">
              <q-input
                outlined
                v-model="props.product.description"
                label="Descripcion"
              />
            </div>
            <div class="col-5">
              <q-input outlined v-model="props.product.price" label="Precio" />
            </div>

            <div class="col-5">
              <q-input outlined v-model="props.product.sku" label="SKU" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions vertical class="justify-around">
          <q-toggle
            v-model="props.product.isActive"
            checked-icon="check"
            color="green"
            label="Producto activo"
            unchecked-icon="clear"
          />

          <q-btn
            padding="xs lg"
            style="margin-left: 15px"
            color="red"
            icon="delete"
            @click="deleteSelectedProduct"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </div>

  <div id="app" class="modal-vue">
    <!-- overlay -->
    <div class="overlay" v-if="opened" @click="opened = false"></div>

    <!-- modal -->
    <div class="modal" v-if="opened">
      <button class="close" @click="opened = false">x</button>
      <h3 style="font-size: large; margin-left: 30%">
        Add image for: {{ props.product.name }}
      </h3>

      <div class="model-gallery">
        <q-card
          v-for="(image, index) in props.product.images"
          :key="index"
          class="modal-product-card"
        >
          <q-card-section horizontal>
            <q-icon
              name="delete"
              style="color: #c50110; font-size: 1.4em; margin-left: auto"
              @click="removeSelectedImage(image)"
            />
            <q-img :src="image.src" class="modal-img"> </q-img>
          </q-card-section>
          <q-inner-loading
            :showing="loading"
            label="Please wait..."
            label-class="text-teal"
            label-style="font-size: 1.1em"
          />
        </q-card>
      </div>
      <q-separator />
      <br />
      <q-uploader
        v-if="props.product.images!.length < 6"
        style="
          max-width: 300px;
          margin-left: auto;
          margin-right: auto;
          min-width: 100px;
        "
        label="Subir nueva imagen"
        multiple
        flat
        auto-upload
        hide-upload-btn
        :max-files="maxFilesToUpload"
        class="uploader-img"
        accept=".jpg, image/*"
        @rejected="onRejected"
        @added="onUploaded"
      />
      <br />
      <q-btn
        @click="saveChanges"
        style="
          background-color: #049dd9;
          color: #fff;
          height: 50px;
          margin-left: 40%;
        "
        >Guardar</q-btn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct, IProductImage } from "../../models/IProduct";
import { ref, type Ref, watch } from "vue";
import productController from "@/views/products/models/Product";
import { useQuasar } from "quasar";
const $q = useQuasar();
const props = defineProps<{
  product: IProduct;
}>();

const maxFilesToUpload: Ref<number> = ref(7 - props.product.images?.length!);

let imagesUploaded: any;

const loading: Ref<boolean> = ref(false);
const deleteSelectedProduct = () => {
  productController.deleteProduct(props.product.id);
};

const opened: Ref<boolean> = ref(false);
const openModal = () => {
  opened.value = true;
};

const noImageSrc = "../../../../assets/no_image.jpg";

function onRejected(rejectedEntries: any) {
  // Notify plugin needs to be installed
  // https://quasar.dev/quasar-plugins/notify#Installation
  $q.notify({
    type: "negative",
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
  });
}

function onUploaded(info: any) {
  imagesUploaded = info;
  let newImageUrL: any;
  info.forEach(function (valor: any, indice: any) {
    //LINK: https://poopcode.com/convert-a-string-to-a-blob-object-in-javascript/
    newImageUrL = URL.createObjectURL(new Blob([info[indice]]));
    props.product.images?.push({ name: valor.__key, src: newImageUrL });
  });
}

function removeSelectedImage(image: IProductImage) {
  productController.removeSpeficiImageProduct(props.product.id, image);
}

function saveChanges() {
  console.log(props.product.images, imagesUploaded);
}
</script>

<style scoped>
.card-products {
  max-height: 500px;
  width: 90vw;
  margin-left: 10%;
}

.imageProduct {
  max-width: 200px;
  max-height: 200px;
  min-width: 80px;
  min-height: 80px;
  margin-top: auto;
  margin-bottom: auto;
  border-radius: 10% !important;
}
.productInfo {
  margin-left: 5%;
  width: 50vw;
}

.modal-vue .overlay {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-vue .close {
  position: absolute;
  top: 10px;
  right: 10px;
}

@media (min-width: 1001px) {
  .modal-vue .modal {
    position: relative;
    width: 40vw;
    z-index: 9999;
    padding: 20px 30px;
    color: black;
    margin-top: -50%;
    margin-left: 50%;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    backdrop-filter: blur(15px);
  }
}

@media (max-width: 545px) {
  .modal-vue .modal {
    position: relative;
    width: 60vw;
    z-index: 9999;
    padding: 20px 30px;
    color: black;
    margin-top: -60% !important;
    margin-left: auto;
    margin-right: auto;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    backdrop-filter: blur(15px);
  }
  .uploader-img {
    width: 150px;
  }
}

@media (min-width: 546px) and (max-width: 900px) {
  .modal-vue .modal {
    position: relative;
    width: 60vw;
    z-index: 9999;
    margin-top: -30%;
    padding: 20px 30px;
    color: black;
    margin-left: auto;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    backdrop-filter: blur(15px);
  }
}

@media (min-width: 901px) and (max-width: 1000px) {
  .modal-vue .modal {
    position: relative;
    width: 60vw;
    z-index: 9999;
    padding: 20px 30px;
    margin-top: -50%;
    color: black;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    backdrop-filter: blur(15px);
  }
}

.model-gallery {
  width: auto;
  display: grid;
  align-items: center;
  justify-items: center;
  gap: 1rem;
  grid-auto-rows: 10rem;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}

.modal-img {
  margin-top: 5px;
  height: 100px;
  width: 100px;
  object-fit: contain;
}

.text-caption {
  height: 5px;
  margin-right: 10%;
  font-size: xx-small;
  border-radius: 50%;
  padding-bottom: 15%;
  background-color: rgba(0, 0, 0, 0.5);
  color: rgb(255, 255, 255);
}
</style>
