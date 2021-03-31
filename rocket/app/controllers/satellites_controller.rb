class SatellitesController < ApplicationController

    def create
        satellite = Satellite.create(satellite_params(:satellite))
    end

    def index
        @satellites_data = Satellite.all
        render_satellites
    end

    private

        # verify params
        def satellite_params
            params.require(:satellite).permit(
                :_id,
                :contactId,
                :contactStatus,
                :contactName,
                :contactGround,
                :contactSatellite,
                :contactEquipment,
                :contactState,
                :contactStep,
                :contactDetail,
                :contactBeginTimest,
                :contactEndTimestamp,
                :contactLatitude,
                :contactLongitude,
                :contactAzimuth,
                :contactElevation,
                :contactResolution,
                :contactResolutionStatus
            )
        end

        # format data before rendering via serializer
        def render_satellites
            render json: SatellitesSerializer.new(@satellites_data).to_serialized_json
        end

end
