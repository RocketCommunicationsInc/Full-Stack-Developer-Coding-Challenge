class SatellitesSerializer

    def initialize(satellite_obj)
        @satellite = satellite_obj
    end

    def to_serialized_json
        @satellite.to_json
    end
end