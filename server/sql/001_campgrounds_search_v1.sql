-- server/sql/001_campgrounds_search_v1.sql
create or replace view public.campgrounds_search_v1 as
select
    cg.id,
    cg.name,
    cg.slug,
    cg.park,
    cg.park_type,
    cg.state,                 -- public.state_enum
    cg.card_description,
    cg.thumbnail,
    cg.thumb_alt,
    cg.featured,
    cg.latitude,
    cg.longitude,
    cg.max_length_feet,
    cg.updated_at,

    -- Flatten amenities and activities into arrays of names
    coalesce(array_agg(distinct a.name)  filter (where a.name  is not null), '{}') as amenities,
    coalesce(array_agg(distinct ac.name) filter (where ac.name is not null), '{}') as activities

from public.campgrounds cg
         left join public.campground_amenities ca on ca.campground_id = cg.id
         left join public.amenities a             on a.id = ca.amenity_id

         left join public.campground_activities cac on cac.campground_id = cg.id
         left join public.activities ac             on ac.id = cac.activity_id

group by cg.id;
