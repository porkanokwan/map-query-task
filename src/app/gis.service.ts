import { Injectable } from '@angular/core';
import { loadModules } from 'esri-loader';

@Injectable({
  providedIn: 'root',
})
export class GisService {
  public map: any;
  public mapView: any;
  public graphic: any;
  public graphicLayer: any;

  constructor() {}

  // ใส่ Map ที่ต้อง
  // public async createTopoBasemap() {
  //   const [Basemap, TileLayer] = await loadModules([
  //     'esri/Basemap',
  //     'esri/layers/TileLayer',
  //   ]);
  //   const topoBasemap = new Basemap({
  //     baseLayers: [
  //       new TileLayer({
  //         url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer',
  //         title: 'World Topo',
  //       }),
  //     ],
  //     title: 'World Topo Basemap',
  //     id: 'topo_basemap',
  //   });
  //   return topoBasemap;
  // }

  public async createFeatureLayer(option: any) {
    const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer']);

    return new FeatureLayer(option);
  }

  public async createQuery(option: any) {
    const [Query] = await loadModules(['esri/rest/support/Query']);

    return new Query(option);
  }

  public async createPolygonGraphic(option: any) {
    const [Graphic] = await loadModules([
      'esri/Graphic',
      'esri/layers/GraphicsLayer',
    ]);

    return new Graphic(option);
  }

  public async createPolygonGraphicLayer(option: { id: number }) {
    const [GraphicsLayer] = await loadModules(['esri/layers/GraphicsLayer']);

    return new GraphicsLayer(option);
  }

  clear() {
    this.graphicLayer.removeAll();
  }
}
