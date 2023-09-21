import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { GisService } from '../gis.service';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css'],
})
export class EsriMapComponent implements OnInit, OnDestroy {
  @ViewChild('mapViewRef', { static: true })
  private mapViewRef!: ElementRef<HTMLDivElement>;
  private layer: any;
  stateValue: any;
  rowID: number = 0;

  constructor(private gisService: GisService) {}

  ngOnInit(): void {
    this.initializeMap();
  }

  async initializeMap() {
    // Load the modules for the ArcGIS API for JavaScript
    const [Map, MapView] = await loadModules([
      'esri/Map',
      'esri/views/MapView',
    ]);
    // Create feature layers and add to map.
    this.layer = await this.gisService.createFeatureLayer({
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2',
    });
    // Configure the Map
    const mapProperties = {
      basemap: 'topo-vector',
      layers: [this.layer], //add layer เข้า map
    };
    this.gisService.map = new Map(mapProperties);
    // Initialize the MapView
    const mapViewProperties = {
      container: this.mapViewRef.nativeElement,
      center: [-118.31966, 34.13375],
      map: this.gisService.map,
      scale: 5000000,
    };
    this.gisService.mapView = new MapView(mapViewProperties);
    await this.gisService.mapView.when(); // wait for map to load

    const query = this.layer.createQuery();
    query.where = '1=1';
    query.outFields = ['*'];
    query.returnGeometry = true;

    const result = await this.layer.queryFeatures(query);
    this.stateValue = result.features?.map((item: any) => {
      return {
        id: item.uid,
        stateName: item.attributes.state_name,
        stateAbbr: item.attributes.state_abbr,
        subRegieon: item.attributes.sub_region,
        rings: item.geometry?.rings,
        type: item.geometry?.type,
      };
    });
    return this.gisService.mapView;
  }

  onAddPolygonGraphic = async (polygon: {
    id: number;
    type: string;
    rings: number[][];
  }) => {
    const simpleFillSymbol = {
      type: 'simple-fill',
      color: [227, 139, 79, 0.8], // orange, opacity 80%
      // outline: {
      //   color: [255, 255, 255],
      //   width: 1,
      // },
    };
    const polygonGraphic = await this.gisService.createPolygonGraphic({
      geometry: { type: polygon.type, rings: polygon.rings },
      symbol: simpleFillSymbol,
    });

    this.gisService.graphicLayer =
      await this.gisService.createPolygonGraphicLayer({ id: polygon.id });
    this.gisService.map.add(this.gisService.graphicLayer); // add layer เข้า map
    this.gisService.graphicLayer.add(polygonGraphic);
  };

  ngOnDestroy() {
    if (this.gisService.mapView) {
      // Destroy the map view.
      this.gisService.mapView.container = null;
    }
  }
}
